<template>
  <div>
    <!-- Slider -->
    <div v-if="action == 'slider' && products != '' && products != null" class="space-y-4">
      <span class="px-4 text-2xl dnSans"> {{ title }} </span>
      <Slider :settings="settings" :custom_buttons="true">
        <Product v-for="(product, index) in products" :key="index" :product="product"/>
      </Slider>
    </div>

    <!-- Default -->
    <div v-else-if="action == 'default'" class="space-y-4">
      <span class="px-4 text-2xl dnSans"> {{ title }} </span>
      <div class="grid grid-cols-4">
        <Product v-for="(product, index) in products" :key="index" :count="count" :product="product" />
        <Empty v-if="products == null || products == '' || products == undefined" :title="'محصولی وجود ندارد'">
          <template>
            <img src="~/assets/image/empty.png">
          </template>
        </Empty>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '~/components/Slider.vue';
import Product from './Product.vue';
import Empty from '~/components/Empty.vue';

export default {
  components: { Slider, Product, Empty },

  props: {
    products: Array,
    action: String,
    title: String,
    count: Number
  },

  data() {
    return {
      settings: {
        arrows: false,
        slidesToShow: 4,
        infinite: true,
        slidesToScroll: 1,
      },
    }
  },
}
</script>
