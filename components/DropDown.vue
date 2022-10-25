<template>
  <div
  class="max-h-48 bg-white rounded-lg shadow-lg overflow-y-scroll absolute mt-4 z-20"
  :style="`width:${width || 'auto'}; left: ${left || 'auto'};`" v-if="toggle"
  >
    <ul class="divide-y px-4 py-2">
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'lists',
    'toggle',
    'width',
    'left'
  ],
}
</script>
