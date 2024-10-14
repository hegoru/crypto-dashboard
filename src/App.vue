<template>
  <div class="container mx-auto py-3">
    <div class="mb-3">
      <label for="tickersFilter" class="block">Filter:</label>
      <input type="text" v-model="filter" name="tickersFilter" class="border-solid border-2 border-slate-50 rounded-md" />
    </div>

    <div>
      <p v-if="filter">Found tickers: {{ filteredTickers.length }}</p>
    </div>

    <hr class="my-8" />

    <div class="grid grid-cols-5 gap-10">
      <div v-for="ticker in paginatedTickers" :key="ticker.id" class="text-center border-2 border-solid border-slate-50 rounded-md h-max">
        <header class="py-1.5 bg-slate-400 text-slate-900">
          <p class="text-l font-bold">
            {{ ticker.symbol }}
          </p>
        </header>
        <div class="py-5">
          <h3>{{ ticker.price }}</h3>
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
        <p :class="fearAndGreedIndexColor" class="text-5xl">{{ fearAndGreedIndex }}</p>
      </article>
    </div>
  </div>
</template>

<script>
import { getCoinList } from './api/binance';

const REQUIRED_PARAMS = ['filter', 'page'];

export default {
  name: "App",

  data() {
    return {
      tickers: [],
      fearAndGreedIndex: 0,

      filter: '',

      page: 1,
      itemsPerPage: 20,
    };
  },

  created() {
    const searchParams = new URLSearchParams(window.location.search);

    REQUIRED_PARAMS.forEach(requiredParam => {
      if (searchParams.has(requiredParam)) {
        this[requiredParam] = searchParams.get(requiredParam);
      }
    });

    this.loadCoinList();
    // this.loadFearAndGreedIndex();

    setInterval(async () => {
      this.loadCoinList();
    }, 5000);

    // const binance_key = import.meta.env.VITE_BINANCE_KEY;
    // console.log(binance_key);
  },

  computed: {
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page
      };
    },

    hasNextPage() {
      return this.filteredTickers.length - this.paginationEndIndex > 0;
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

    filteredTickers() {
      if (this.filter.length === 0) {
        return this.tickers;
      }

      return this.tickers.filter(coin => coin.symbol.toLowerCase().includes(this.filter.toLowerCase()));
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.paginationStartIndex, this.paginationEndIndex);
    },

    fearAndGreedIndexColor() {
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
    async loadCoinList() {
      const coinList = await getCoinList();
      this.tickers = coinList;
    },

    updateFearAndGreedIndex() {
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
