<script setup lang="ts">
  import {BoxProps} from "./BoxProps";

  const props = defineProps<BoxProps>()
</script>

<template>
  <div class="box-container">
    <h1>{{title}}</h1>
    <slot>box-content</slot>
  </div>
</template>

<style scoped>
  .box-container {
    padding: 16px;
    width: 100%;
    border: black 2px solid;
    max-width: 500px;
  }
</style>