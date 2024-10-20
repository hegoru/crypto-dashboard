<template>
  <div class="text-center border-2 border-solid border-slate-50 rounded-md h-max">
    <header class="py-1.5 bg-slate-400 text-slate-900">
      <p class="text-l font-bold">
        {{ tickerSymbol }}
      </p>
    </header>
    <div class="py-5">
      <h3>{{ tickerPrice }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tickerSymbol: {
      type: String,
      required: true,
      default: ''
    },

    tickerPrice: {
      type: String,
      required: true,
      default: '-'
    }
  }
}
</script>