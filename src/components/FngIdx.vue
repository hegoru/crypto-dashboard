<template>
  <article class="flex flex-col items-center">
    <h2 class="mb-5 text-xl">{{ fngData.name }}</h2>
    <h3 :class="fngTextColor" class="mb-3 text-6xl">{{ fngValue }}</h3>
    <p :class="fngBgColor" class="px-3 py-1 text-l font-bold text-white rounded-md">{{ fngData.data[0].value_classification }}</p>
  </article>
</template>

<script>
export default {
  props: {
    fngData: {
      type: Object,
      required: true,
      default: {}
    }
  },

  computed: {
    fngValue() {
      return Number(this.fngData.data[0].value) || this.fngData;
    },

    fngTextColor() {
      if (this.fngValue > 75) {
        return 'text-green-600';
      } else if (this.fngValue > 50) {
        return 'text-lime-500';
      } else if (this.fngValue > 49) {
        return 'text-gray-400';
      } else if (this.fngValue > 25) {
        return 'text-orange-600';
      } else if (this.fngValue > 0) {
        return 'text-red-600';
      } else {
        return 'text-white';
      }
    },

    fngBgColor() {
      if (this.fngValue > 75) {
        return 'bg-green-600';
      } else if (this.fngValue > 50) {
        return 'bg-lime-500';
      } else if (this.fngValue > 49) {
        return 'bg-gray-400';
      } else if (this.fngValue > 25) {
        return 'bg-orange-600';
      } else if (this.fngValue > 0) {
        return 'bg-red-600';
      } else {
        return 'bg-slate-900';
      }
    },
  },
}
</script>