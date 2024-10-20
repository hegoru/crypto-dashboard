<template>
  <form>
    <label for="tickersFilter" class="block">Filter:</label>
    <input
      @input="$emit('update:modelValue', $event.target.value);"
      :value="modelValue"
      type="text"
      name="tickersFilter"
      class="border-solid border-2 border-slate-50 rounded-md" />
  </form>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
      default: ''
    }
  },
}
</script>