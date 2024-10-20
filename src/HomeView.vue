<template>
  <div class="container mx-auto py-3">
    <div class="mb-3">
      <crypto-filter v-model="filter" class="mb-2" />

      <tickers-found
        v-if="filter"
        :tickersFound="filteredTickers.length" />
    </div>

    <hr class="my-8" />

    <crypto-tickers :tickers="paginatedTickers" />

    <div class="mt-10 flex justify-center">
      <pagination-buttons
        :page="Number(page)"
        :pages="totalPages"
        @prev-page="prevPage"
        @next-page="nextPage" />
    </div>
  </div>
</template>

<script>
import { getCoinList } from './api/binance';
import CryptoFilter from './components/CryptoFilter.vue';
import TickersFound from './components/TickersFound.vue';
import CryptoTickers from './components/CryptoTickers.vue';
import PaginationButtons from './components/pagination/PaginationButtons.vue';

const REQUIRED_PARAMS = ['filter', 'page'];

export default {
  components: {
    CryptoFilter,
    TickersFound,
    CryptoTickers,
    PaginationButtons
  },

  data() {
    return {
      tickers: [],
      fearAndGreedIndex: 0,

      filter: '',
      page: 1,
      itemsPerPage: Number(import.meta.env.VITE_PAGINATION_ITEMS_PER_PAGE),
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

    setInterval(async () => {
      this.loadCoinList();
    }, 3000);
  },

  computed: {
    pageStateOptions() {
      return {
        filter: this.filter,
        page: this.page
      };
    },

    filteredTickers() {
      if (this.filter.length === 0) {
        return this.tickers;
      }

      return this.tickers.filter(
        ticker => ticker.symbol.toLowerCase().includes(this.filter.toLowerCase())
      );
    },

    paginatedTickers() {
      return this.filteredTickers.slice(this.paginationStartIndex, this.paginationEndIndex);
    },

    paginationStartIndex() {
      return this.itemsPerPage * (this.page - 1);
    },

    paginationEndIndex() {
      return this.paginationStartIndex + this.itemsPerPage;
    },

    totalPages() {
      return Math.ceil(this.filteredTickers.length / this.itemsPerPage);
    }
  },

  methods: {
    async loadCoinList() {
      const coinList = await getCoinList();
      this.tickers = coinList;
    },

    nextPage() {
      this.page++;
    },

    prevPage() {
      this.page--;
    },
  },

  watch: {
    filter() {
      this.page = 1;
    },

    pageStateOptions() {
      const url = new URL(window.location);
      Object.entries(this.pageStateOptions).forEach((pageStateOption) => {
        url.searchParams.set(pageStateOption[0], pageStateOption[1])
      });
      window.history.pushState({}, url.hostname, url);
    },
  }
}
</script>