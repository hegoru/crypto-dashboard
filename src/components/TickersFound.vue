<template>
    <p>Found tickers: {{ tickersFound }}</p>
</template>

<script>
export default {
  props: {
    tickersFound: {
      type: Number,
      required: true,
      default: -1
    }
  }
}
</script>