<script setup lang="ts">
  import {InputProps} from './types';
  const props = defineProps<InputProps>()
  const model = defineModel<string>()

  const onInput = (e) => {
    model.value = e.target.value
  }

</script>
<template>
  <input required type="text" @input="onInput" :value="model" class="input" :placeholder="placeholder" />
</template>

<style scoped>
  .input {
    background: #ffffff;
    padding: 0.3rem;
    border: 1px solid #bbbbbb;
  }

</style>