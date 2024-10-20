<template>
  <div>
    <fng-idx :fngData="fng" />
  </div>
</template>

<script>
import { getFng } from './api/alternative_me';
import FngIdx from './components/FngIdx.vue';

export default {
  components: {
    FngIdx
  },

  data() {
    return {
      fng: {
        name: "Fear and Greed Index",
        data: [
          {
            value: -1,
            value_classification: "None"
          }
        ]
      }
    };
  },

  created() {
    this.loadFearAndGreedIndex();
  },

  methods: {
    async loadFearAndGreedIndex() {
      const data = await getFng();
      this.fng = data;
    },
  }
}
</script>