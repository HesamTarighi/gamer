<template>
  <div>
    <section class="w-full flex justify-center">
      <div class="w-2/3 space-y-4">
        <!-- Filter -->
        <div class="w-full px-2 relative">
          <div class="w-full bg-white flex items-center gap-8 rounded-full py-2 px-4">
            <!-- Sort -->
            <div>
              <div>
                <!-- Change type button -->
                <div> <button @click="ChangeToggle()"> {{ sort_name[0].show_name }} <fa class="px-2" :icon="['fas', 'angle-down']"/> </button> </div>
                <!-- Types -->
                <div @mouseleave="related = []">
                  <DropDown :toggle="toggle">
                    <template>
                      <li v-for="(type, index) in types" :key="index" class="py-2" @mousemove="type.related != '' && type.related != null ? related = type.related : related = []">
                        <nuxt-link :to="`/products/${type.type_name}`" class="links">
                          {{ type.show_name }}
                          <fa :icon="['fas', 'angle-left']" v-if="type.related != '' && type.related != null && type.related != undefined"/>
                        </nuxt-link>
                      </li>
                    </template>
                  </DropDown>
                </div>

                <DropDown :toggle="toggle" v-if="related != '' && related != null" :left="'75%'">
                  <template>
                    <li v-for="(item, index) in JSON.parse(related)" :key="index" class="py-2">
                      <nuxt-link :to="`/products/${item}`" class="links"> {{ item }} </nuxt-link>
                    </li>
                  </template>
                </DropDown>
              </div>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div>
          <Products :products="FilterProducts(params.id)" :action="'default'" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .links:hover {
    color: var(--blue1);
  }
</style>

<script>
// Components
import Products from '~/components/Main/Products/Products.vue';
import DropDown from '~/components/DropDown.vue';

// Mixins
import Methods_Mixin from '~/mixins/Methods.js'

export default {
  components: { Products, DropDown },

  mixins: [Methods_Mixin],

  asyncData(context, callback) {
    callback(null, {
      params: context.route.params,
      types: context.store.state.types,
      related: [],
    })
  },

  computed: {
    sort_name() {
      return this.types.filter((type) => type.type_name == this.params.id);
    }
  },
}
</script>
