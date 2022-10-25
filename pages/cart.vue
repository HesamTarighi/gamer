<template>
  <div class="w-full flex justify-center">
    <div v-if="!$auth.loggedIn">
      <Empty :title="products.message">
        <img src="~/assets/image/empty.png" alt="">
      </Empty>
    </div>
    <div v-else-if="products == '' || products == null || products == undefined">
      <Empty :title="'سبد خرید شما خالی است.'">
        <img src="~/assets/image/empty.png" alt="">
      </Empty>
    </div>
    <div class="w-2/3 grid grid-cols-7 gap-8" v-else>
      <section class="col-span-5">
        <div>
          <div>
            <table class="w-full bg-white divide-y" cellpadding="10">
              <thead>
                <tr>
                  <th></th>
                  <th> نام </th>
                  <th> قیمت </th>
                  <th> تعداد </th>
                </tr>
              </thead>

              <tbody class="divide-y">
                <tr class="text-center" v-for="(product, index) in products" :key="index">
                  <td class="w-36"> <img :src="require('~/assets/image/ps4.jpg')" class="object-cover"> </td>
                  <td> <a href="/" class="underline txt-blue1"> {{ product.name }} </a> </td>
                  <td> {{ Number(product.price).toLocaleString() }} تومان </td>
                  <td> {{ product.count }} </td>
                  <td> <button class="text-red-500" @click="Delete(product.id)"> <fa :icon="['fas', 'x']"/> </button> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <aside class="col-span-2 side-bar">
        <div class="bg-white rounded-xl p-4 space-y-8">
          <div class="w-full bg-white1 rounded-xl flex justify-between px-6 py-2"> <span class="opacity-80"> جمع کل: </span> <span class="font-bold text-lg"> {{ $store.state.total_price.toLocaleString() }} <span class="text-xs opacity-60"> تومان </span> </span> </div>
          <div> <button class="w-full bg-green1 rounded-md px-6 py-2 text-white"> تصویه حساب </button> </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
  .side-bar > div {
    position: sticky;
  }
</style>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.cart
    }
  },

  methods: {
    async Delete(id) {
      await this.$store.dispatch('DeleteFromCart', id)
    }
  },
}
</script>
