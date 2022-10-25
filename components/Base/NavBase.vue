<template>
  <!-- Static -->
  <div class="w-2/3 py-2 space-y-4" :style="fixed ? `padding-bottom: ${$refs.links.offsetHeight}px;` : '' " ref="nav">
    <div class="flex items-center gap-8 text-gray-900">
      <!-- Site logo -->
      <div class="w-1/6"> <a href="/"> <img src="~/assets/logo-text.png" alt=""> </a> </div>
      <!-- Search box -->
      <div class="w-full">
        <div class="w-full"> <input type="text" v-model="search" placeholder="جستجو کنید..." class="w-full bg-transparent border border-blue1 rounded-full px-2 py-1 placeholder-gray-400"> </div>
        <DropDown :toggle="toggle" :width="'30%'">
          <template>
            <ul>
              <li v-for="(data, index) in search_data" :key="index" class="py-1 grid grid-cols-1"> <a :href="`/products/ ${JSON.parse(data.type)[0]} / ${data.id}`" class="links"> {{ data.name }} </a> <Divider/> </li>
            </ul>
          </template>
        </DropDown>
      </div>
      <!-- Cart and login buttons -->
      <div class="w-1/5">
        <UserNav />
      </div>
    </div>

    <!-- Fixed -->
    <div class="w-full bg-white flex justify-center py-2 px-4" style="z-index: 90;" :class="fixed ? 'fixed -top-4 right-0 shadow-lg' : ''" ref="links">
      <!-- Site links -->
      <div class="w-2/3 flex justify-between items-center">
        <div>
          <Links :links="links"/>
        </div>
      <!-- Cart and login buttons -->
        <div class="w-1/3" v-if="fixed">
          <UserNav />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .links:hover {
    color: var(--blue1);
  }
</style>

<script>
// Components
import Links from '../SiteLinks.vue'
import DropDown from '~/components/DropDown.vue'

// Mixins
import Methods from '~/mixins/Methods.js'
export default {
  components: {
    Links,
    DropDown
  },

  mixins: [Methods],

  data() {
    return {
      // For navbar fixed
      fixed: false,

      search: '',
    }
  },

  computed: {
    links() {
      return this.$store.state.links.filter((link) => link.short_link == true);
    },

    search_data() {
      if (this.$store.state.products != null && this.$store.state.products != '' && this.$store.state.products != undefined) {
        return this.$store.state.products.filter((product) => {
          return product.name.includes(this.search);
        })
      }
    }
  },

  mounted() {
    // Methods for navbar fixed
    window.addEventListener('load', this.fixedNav)
    window.addEventListener('scroll', this.fixedNav)
  },

  methods: {
    fixedNav() {
      if (window.scrollY >= this.$refs.nav.offsetHeight) {
        this.fixed = true;
      }else {
        this.fixed = false;
      }
    }
  },

  watch: {
    search: {
      handler() {
        if (this.search_data != null && this.search_data != '') {
          this.OpenToggleBox()
        }
      }
    }
  }
}
</script>
