<template>
  <div class="relative">
    <div>
      <Slider :settings="settings">
        <div v-for="(highlight, index) in highlights" :key="index" class="slide">
          <div> <a href="/" @dragstart="NotDraggable($event)"> <img @dragstart="NotDraggable($event)" :src="require('~/assets/image/' + highlight.image)"> </a> </div>
        </div>
      </Slider>
    </div>
  </div>
</template>

<script>
// Components
import Slider from '~/components/Slider.vue'

// Mixins
import Methods from '~/mixins/Methods.js'

  export default {
    components: { Slider },

    mixins: [ Methods ],

    props: ['highlights'],

    data() {
      return {
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 1,
          infinite: true,
          slidesToScroll: 1,
          autoplay: true,
          rtl: true,
          pauseOnHover: false,
        }
      }
    },
  }
</script>

<style scoped>
  img {
    height: 90vh;
  }
</style>
