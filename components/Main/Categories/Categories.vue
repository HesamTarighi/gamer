<template>
  <div>
    <div class="flex justify-between gap-4">
      <div
      v-for="(item, index) in data"
      :key="index"
      class="bg-white flex justify-center rounded-full relative box"
      >
        <a :href="item.href" class="relative">
          <img class="object-contain" :src="require('~/assets/icons/' + item.image)" />
          <div class="w-full absolute -bottom-8 text-center categorie-name">
            <span class="opacity-70"> {{ item.name }} </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: false,
    }
  }
}
</script>

<style scoped>
  .box {
    width: 170px;
    height: 170px;
  }

  .box img {
    transform: scale(1.2);
  }

  .box:hover .categorie-name {
    opacity: 1;
  }

  .box:hover .categorie-name span {
    opacity: 1 !important;
  }
</style>
