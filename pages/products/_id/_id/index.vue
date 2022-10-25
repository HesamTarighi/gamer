<template>
  <div class="space-y-36">
    <section class="flex justify-center">
      <div class="w-2/3">
        <div class="grid grid-cols-2 gap-16">
          <div>
            <div class="rounded-lg relative overflow-hidden cover-box">
              <img
              :src="require(`~/assets/image/ps4.jpg`)"
              class="absolute top-0 left-0 cover"
              @mousemove="Zoom($event)"
              @mouseleave="zoom.x = 0, zoom.y = 0"
              ref="cover"
              :style="`transform: translate(${zoom.x}px, ${zoom.y}px);`"
              />
            </div>

            <div class="bg-white rounded-xl pt-2 z-20 mt-4">
              <Slider :settings="settings">
                <div class="px-2" v-for="(src, index) in JSON.parse(product.gallery)" :key="index"> <img :src="require(`~/assets/image/ps4.jpg`)" class="rounded-xl gallery" @click="ChangeCover(src)" @dragstart="draggable($event)"> </div>
              </Slider>
            </div>
          </div>

          <div class="space-y-8">
            <div class="space-y-4">
              <div class="text-2xl">
                <span> {{ product.name }} </span>
              </div>
              <Divider />
              <div class="txt-blue1 text-2xl space-x-2">
                <span class="line-through text-gray-900 opacity-30" v-if="product.total_price != product.price"> {{ product.price }} </span>
                <span> {{ Number(product.total_price).toLocaleString() }} تومان </span>
              </div>
              <div>
                <ul class="space-y-1 list-disc opacity-80">
                  <li v-for="(option, index) in options" :key="index"> {{ option }} </li>
                </ul>
              </div>
              <div class="space-y-4 pt-4">
                <div>
                  <span> <span class="txt-green1"> <fa :icon="['fas', 'circle-check']"/> </span> {{ product.count }} عدد در انبار موجود است. </span>
                </div>

                <div class="flex items-center gap-4">
                  <div class="text-center px-4 py-1 bg-white rounded-full">
                    <button @click="Counter('Up')"> <fa :icon="['fas', 'angle-up']"/> </button>
                    <span class="px-4 select-none"> {{ count }} </span>
                    <button @click="Counter('Down')"> <fa :icon="['fas', 'angle-down']"/> </button>
                  </div>

                  <div>
                    <button class="px-12 py-2 bg-blue1 rounded-full text-white" @click="AddToCart()"> افزودن به سبد خرید </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full flex justify-center" v-if="Similars(products, product) != ''">
      <div class="w-2/3">
        <Products :products="DataCount(Similars(products, product), 4)" :count="count" action="default" :title="'محصولات مشابه'"/>
      </div>
    </section>
  </div>
</template>

<script>
// Components
import Slider from '~/components/Slider.vue'
import Products from '~/components/Main/Products/Products.vue'
// Mixins
import Slider_Mixins from '~/mixins/Slider.js'
import Methods_Mixins from '~/mixins/Methods.js'

export default {
  components: { Slider, Products },

  mixins: [Slider_Mixins, Methods_Mixins],

  asyncData(context, callback) {
    callback(null, {
      products: context.store.state.products,
      id: context.route.params.id,
      options: [
        'کنسول ps4 فت',
        'کار کرد در حد نو',
        '2 دسته',
        '10 عدد بازی , gtav, reddead2, eldenring, fifa22, pes22, callofduty warzone, evil village, hellblade, god of war4, god of war3',
      ],
      count: 1,

      settings: {
        arrows: false,
        slidesToShow: 4,
        infinite: true,
        slidesToScroll: 1,
      },

      zoom: {
        x: 0,
        y: 0,
      },

      src: '',
    })
  },

  computed: {
    // Filter product sort id == params.id
    product() {
      const product = this.products.filter((product) => product.id == this.id)
      return product[0]
    },

    // Product cover image
    cover() {
      return this.src == '' ? this.product.src : this.src
    },
  },

  methods: {
    Counter(action) {
      switch (action) {
        case 'Up':
          this.product.count > this.count ? this.count++ : this.product.count
          break;

        case 'Down':
          this.count > 1 ? this.count-- : 10
          break;
      }
    },

    ChangeCover(src) {
      this.src = src
    },

    Zoom(e) {
      const width = this.$refs.cover.offsetWidth;
      const height = this.$refs.cover.offsetHeight;
      const max_move = 100;

      this.zoom.x = Math.floor(-(e.offsetX - (width / 2)) * (max_move / width));
      this.zoom.y = Math.floor(-(e.offsetY - (height / 2)) * (max_move / height));
    },

    AddToCart() {
      const data = {
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        count: this.count,
        max_count: this.product.count,
        id: this.product.id,
        user_email: !this.$auth.user ? null : this.$auth.user.email,
      };

      this.$store.dispatch('AddToCart', data)
    }
  },
}
</script>

<style scoped>
  .cover-box {
    width: 100%;
    height: 400px;
  }

  .cover {
    width: 100%;
    height: 400px;
    transition: all .3s;
  }

  .cover:hover {
    scale: 1.4;
  }

  .gallery {
    max-height: 100px;
    min-height: 100px;
    object-fit: cover;
  }
</style>
