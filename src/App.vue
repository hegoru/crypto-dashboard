<template>
  <div class="container mx-auto py-3">
    <div class="mb-3">
      <label for="coinsFilter" class="block">Filter:</label>
      <input type="text" v-model="filter" name="coinsFilter" class="border-solid border-2 border-slate-50 rounded-md" />
    </div>

    <div>
      <p v-if="filter">Found coins: {{ filteredCoins.length }}</p>
    </div>

    <hr class="my-8" />

    <div class="grid grid-cols-5 gap-10">
      <div v-for="coin in filteredAndPaginatedCoins" :key="coin.id" class="text-center border-2 border-solid border-slate-50 rounded-md h-max">
        <header class="py-1.5 bg-slate-400 text-slate-900">
          <p class="text-l font-bold">
            {{ coin.symbol }}
          </p>
        </header>
        <div class="py-5">
          <h3>{{ coin.price }}</h3>
        </div>
      </div>
    </div>

    <div class="mt-7 flex justify-center">
      <div class="flex items-center">
        <button
          @click="prevPage"
          :class="{ 'opacity-50' : hasNoPrevPage }"
          :disabled="hasNoPrevPage"
          class="mr-5 px-1 hover:bg-slate-700 border-2 border-solid border-slate-50 rounded-md">
            &lt; Previous page
        </button>
        <button 
          @click="nextPage"
          :class="{ 'opacity-50' : hasNoNextPage }"
          :disabled="hasNoNextPage"
          class="px-1 hover:bg-slate-700 border-2 border-solid border-slate-50 rounded-md">
            Next page &gt;
        </button>
      </div>
    </div>

    <hr class="my-8" />

    <div>
      <article class="text-center">
        <h2 class="mb-5 text-xl">Fear and greed index</h2>
        <p :class="computedFearAndGreedIndexColor" class="text-5xl">{{ fearAndGreedIndex }}</p>
      </article>
    </div>
  </div>
</template>

<script>
import { getCoinList } from './api/binance';
import { getFearAndGreedIndex } from './api/coinglass';

export default {
  name: "App",

  data() {
    return {
      coins: [],
      fearAndGreedIndex: 0,

      filter: '',

      page: 1,
      itemsPerPage: 20,
    };
  },

  created() {
    const searchParams = new URLSearchParams(window.location.search);

    const REQUIRED_PARAMS = ['filter', 'page'];
    REQUIRED_PARAMS.forEach(requiredParam => {
      if (searchParams.has(requiredParam)) {
        this[requiredParam] = searchParams.get(requiredParam);
      }
    });

    this.loadCoinList();
    this.loadFearAndGreedIndex();

    setInterval(async () => {
      this.loadCoinList();
    }, 5000);
  },

  computed: {
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page
      };
    },

    hasNextPage() {
      return this.filteredCoins.length - this.paginationEndIndex > 0;
    },

    hasPrevPage() {
      return this.page > 1;
    },

    hasNoNextPage() {
      return !this.hasNextPage;
    },

    hasNoPrevPage() {
      return !this.hasPrevPage;
    },

    paginationStartIndex() {
      return this.itemsPerPage * (this.page - 1);
    },

    paginationEndIndex() {
      return this.paginationStartIndex + this.itemsPerPage;
    },

    filteredAndPaginatedCoins() {
      return this.filteredCoins.slice(this.paginationStartIndex, this.paginationEndIndex);
    },

    filteredCoins() {
      if (this.filter.length === 0) {
        return this.coins;
      }

      return this.coins.filter(coin => coin.symbol.toLowerCase().includes(this.filter.toLowerCase()));
    },

    // Красная зона, от 0 до 25, — инвесторы напуганы.
    // Оранжевая зона, от 26 до 49, — на рынке преобладает страх.
    // Серая зона, около отметки 50, — нейтральный настрой.
    // Салатовая зона, от 51 до 75, — на рынке преобладает жадность.
    // Зеленая зона, от 76 до 100, — инвесторы категорично жадны.

    computedFearAndGreedIndexColor() {
      if (this.fearAndGreedIndex > 75) {
        return 'text-green-600';
      } else if (this.fearAndGreedIndex > 50) {
        return 'text-lime-400';
      } else if (this.fearAndGreedIndex > 49) {
        return 'text-gray-400';
      } else if (this.fearAndGreedIndex > 25) {
        return 'text-orange-600';
      } else {
        return 'text-red-600';
      }
    },
  },

  methods: {
    loadCoinList() {
      getCoinList().then(data => this.coins = data);
    },

    loadFearAndGreedIndex() {
      getFearAndGreedIndex().then(data => this.fearAndGreedIndex = data);
    },

    nextPage() {
      this.page++;
    },

    prevPage() {
      this.page--;
    }
  },

  watch: {
    filter() {
      const url = new URL(window.location);
      Object.entries(this.pageStateOptions).forEach((pageStateOption) => {
        url.searchParams.set(pageStateOption[0], pageStateOption[1])
      });
      window.history.pushState({}, url.hostname, url);
    },

    page() {
      const url = new URL(window.location);
      Object.entries(this.pageStateOptions).forEach((pageStateOption) => {
        url.searchParams.set(pageStateOption[0], pageStateOption[1])
      });
      window.history.pushState({}, url.hostname, url);
    }
  }
};
</script>

<style>
</style>
