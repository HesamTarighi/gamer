<template>
  <div class="opacity-50 divide" :style="`background: ${color || 'gray'};`"></div>
</template>

<script>
export default {
  props: ['color']
}
</script>

<style scoped>
  .divide {
    width: 100%;
    height: 1px;
  }
</style>
