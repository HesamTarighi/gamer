<template>
  <!-- Site links -->
  <ul class="flex flex-wrap gap-8">
    <li v-for="(link, index) in links" :key="index" class="relative opacity-60 px-1" :class="$route.path == link.href ? 'txt-blue1 opacity-100 nav-link-active' : ''"> <a :href="link.href"> {{ link.name }} </a> </li>
  </ul>
</template>

<script>
export default {
  props: {
    links: Array,
  }
}
</script>

<style scoped>
  li:hover {
    opacity: 1;
  }
</style>
