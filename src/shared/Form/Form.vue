<script setup lang="ts">
  import Button from "@/shared/UserButton/UserButton.vue";

</script>

<template>
  <form class="wrapper">
    <slot />
  </form>
</template>

<style>
  .wrapper {
    padding: 20px;
    background: #f6f6f6;
    border: solid 2px black;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: fit-content;
    max-width: 500px;
  }
</style>