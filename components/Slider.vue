<template>
  <div class="relative">
    <button v-if="settings.arrows == false && custom_buttons" @click="nextSlide()" class="slider__buttons slider__buttons--next"> <fa :icon="['fas', 'angle-right']"/> </button>
    <button v-if="settings.arrows == false && custom_buttons" @click="prevSlide()" class="slider__buttons slider__buttons--prev"> <fa :icon="['fas', 'angle-left']"/> </button>
    <VueSlickCarousel v-bind="settings" ref="carousel">
      <slot/>
    </VueSlickCarousel>
  </div>
</template>

<script>
// Components
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

//Mixins
import Slider from '~/mixins/Slider.js'

export default {
  components: { VueSlickCarousel },

  props: { settings: Object, custom_buttons: Boolean, },

  mixins: [ Slider ],
}
</script>

<style scoped>
  /* Locale css file for slider */
  @import url('~/static/custom-ui/slider.css');
</style>
