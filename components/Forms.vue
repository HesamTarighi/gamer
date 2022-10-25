<template>
  <div class="w-full flex justify-center">
    <div class="w-2/5 bg-white rounded-xl px-8 py-4 box">
      <div class="space-y-8">
        <h2 class="text-2xl dnSans"> {{ title }} </h2>
        <div>
          <form class="flex flex-col items-center gap-4" @submit.prevent="Submit()">
            <slot name="inputs"/>
            <div>
              <input type="submit" :value="submit_btn || title" class="bg-green1 rounded-full cursor-pointer px-8 py-1 text-white">
            </div>
          </form>
          <div class="pt-8" v-if="links != undefined">
            <div v-for="(link, index) in links" :key="index" class="py-2">
              <span class="opacity-70" v-if="link.label != undefined"> {{ link.label }}: </span>
              <nuxt-link :to="link.href" class="txt-blue1 underline"> {{ link.name }}  <fa :icon="['fas', 'arrow-left']"/> </nuxt-link>
            </div>
          </div>
          <div>
            <slot name="elemans"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .box {
    min-height: 300px;
  }
</style>

<script>
export default {
  props: {title: String, links: Array, Submit: Function, submit_btn: String, },
}
</script>
