<script setup lang="ts">
  // import {ButtonProps} from "./ButtonProps";

  // const props = defineProps<ButtonProps>()
</script>

<template>
  <button class="button">
    <slot>Fallback</slot>
  </button>
</template>

<style>
  .button {
    background: white;
    border: black solid 2px;
    padding: 8px;
    font-size: inherit;
    font-weight: bold;
  }
</style>