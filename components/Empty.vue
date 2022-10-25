<template>
  <div class="w-full col-span-4 flex flex-col items-center py-10">
    <h2 class="text-4xl text-center dnSans"> {{ title }} </h2>
    <div class="empty-image">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .empty-image {
    width: 900px;
  }
</style>

<script>
export default {
  props: {
    title: {type: String, required: true},
  },
}
</script>
