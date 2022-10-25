<template>
  <div class="flex justify-center relative z-20 text-white">
    <div class="w-2/3 flex flex-col justify-between gap-12 py-2 footer__size">
      <div>
        <!-- All links of site -->
        <Links :links="links"/>
      </div>

      <div class="grid grid-cols-3">
        <!-- Email & Addres ... -->
        <div> ایمیل: <a href="/" class="opacity-80 underline"> Gamer@info.com </a> </div>
        <div> آدرس مغازه: <span class="opacity-80"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis esse, natus repudiandae fugiat nulla ratione. </span> </div>
        <div class="text-left"> شماره تماس: <a href="/" class="opacity-80 underline"> 09910138705 </a> </div>
      </div>

      <div class="grid grid-cols-3">
        <div>
          <!-- Creator -->
          توسعه دهنده سایت: <a href="/" class="txt-blue1 underline"> حسام طریقی </a>
        </div>

        <div class="text-center opacity-90">
          <!-- Copyright -->
          تمامی حقوق این سایت مطعلق به فروشگاه گیمر است.
        </div>

        <div class="flex justify-end gap-4 text-2xl">
          <!-- Contact -->
          <a href="/"> <fa :icon="['fab', 'telegram']"/> </a>
          <a href="/"> <fa :icon="['fab', 'whatsapp']"/> </a>
          <a href="/"> <fa :icon="['fab', 'instagram']"/> </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Links from '~/components/SiteLinks.vue'
export default {
  components: {Links},

  data() {
    return {
      links: this.$store.state.links,
    }
  },
}
</script>

<style scoped>
  a:hover {
    opacity: 1;
  }
</style>
