<template>
  <div class="flex items-center">
    <button
      @click="previousPage"
      :disabled="!hasPreviousPage"
      :class="{ 'opacity-50' : !hasPreviousPage }"
      class="mr-5 px-1 hover:bg-slate-700 border-2 border-solid border-slate-50 rounded-md">
        &lt; Previous page
    </button>

    <p class="mr-5">
      {{ page }} / {{ pages }}
    </p>

    <button
      @click="nextPage"
      :disabled="!hasNextPage"
      :class="{ 'opacity-50' : !hasNextPage }"
      class="mr-5 px-1 hover:bg-slate-700 border-2 border-solid border-slate-50 rounded-md">
        Next page &gt;
    </button>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
      default: 1
    },

    pages: {
      type: Number,
      required: true,
      default: 1,
    },
  },

  emits: {
    prevPage: null,
    nextPage: null
  },

  computed: {
    hasNextPage() {
      return this.page !== this.pages;
    },

    hasPreviousPage() {
      return this.page > 1;
    },
  },

  methods: {
    previousPage() {
      this.$emit('prevPage');
    },

    nextPage() {
      this.$emit('nextPage');
    }
  }
}
</script>