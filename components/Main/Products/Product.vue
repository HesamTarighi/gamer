<template>
  <div class="px-2 py-2">
    <div class="bg-white rounded-lg overflow-hidden rtl product">
      <div class="h-52 relative">
        <div v-if="product.discount > 0" class="bg-red-500 px-2 py-14 absolute -top-10 left-0 inline-block text-white discount"> {{ product.discount }}% </div>
        <div class="opacity-0 product-modal">
          <div class="w-full h-full absolute top-0 left-0 bg-black1 opacity-80 z-60"></div>
          <div class="flex center">
            <a :href="`/products/${JSON.parse(product.type)[0]}/${product.id}`"> <button class="rounded-md px-6 py-2 z-70 btn"> مشاهده </button> </a>
            <button class="rounded-full px-3 py-2 mx-3 z-70 btn" @click="AddToCart()"> <fa :icon="['fas', 'plus']"/> </button>
          </div>
        </div>
        <img :src="require('~/assets/image/' + product.image)" alt="">
      </div>
      <div class="px-4 py-2 divide-y space-y-4">
        <div class="space-y-2">
          <a href="/" class="product-name"> {{ product.name }} </a>
        </div>
        <div class="pt-2 flex justify-between">
          <span class="opacity-70"> تومان {{ Number(product.price).toLocaleString() }} </span>
          <div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    count: Number
  },

  methods: {
    AddToCart() {
      const data = {
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        count: this.count == undefined ? 1 : this.count,
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
  .title::before {
    content: '';
    width: 90%;
    height: 1px;
    background-color: #000;
    opacity: .4;
    position: absolute;
    top: 50%;
    right: 0;
    border-radius: 10000px;
    z-index: 10;
  }

  .product {
    min-height: 300px;
    max-height: 750px;
  }

  .product-modal {
    transition: all .2s;
  }

  .product:hover .product-modal {
    opacity: 1 !important;
  }

  .product-name:hover {
    color: var(--blue1);
  }

  .discount {
    height: 70%;
    transform: rotateZ(45deg);
  }
</style>
