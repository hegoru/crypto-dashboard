<template>
  <div class="grid grid-cols-5 gap-10">
    <crypto-ticker
      v-for="(ticker, idx) in tickers"
      :key="idx"
      :tickerSymbol="ticker.symbol"
      :tickerPrice="ticker.price"
      class="text-center border-2 border-solid border-slate-50 rounded-md h-max"
    />
  </div>
</template>

<script>
import CryptoTicker from './CryptoTicker.vue';

export default {
  components: {
    CryptoTicker
  },

  props: {
    tickers: {
      type: Array,
      required: true,
      default: []
    }
  },
}
</script>