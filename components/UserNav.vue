<template>
  <div class="flex justify-end items-center gap-4">
    <div>
      <a href="/login" v-if="!$auth.loggedIn"> <button class="px-6 py-2 btn rounded-md"> ورود </button> </a>
      <div v-else>
        <button @click="ChangeToggle()" class="txt-blue1 underline flex flex-row-reverse gap-2"> <span> {{ user }} </span> <span> <fa :icon="['fas', 'angle-down']" v-if="toggle"/> <fa :icon="['fas', 'angle-right']" v-else/> </span> </button>
        <DropDown :toggle="toggle">
          <template>
            <li class="py-1">
              <button @click="LogoutHandler()" class="txt-red1"> خروج <fa :icon="['fas', 'arrow-right-from-bracket']"/></button>
            </li>
          </template>
        </DropDown>
      </div>
    </div>
    <div class="text-xl py-2 txt-yellow1 relative">
      <a href="/cart">
        <span class="w-4 h-4 bg-yellow1 rounded-full absolute top-2 -left-2 txt-gray1 text-sm cart-badge"> <span class="center"> {{ $store.state.count_cart }} </span> </span>
        <fa :icon="['fas', 'bag-shopping']" />
      </a>
    </div>
  </div>
</template>

<script>
// Mixins
import Methods from '~/mixins/Methods.js'
export default {
  mixins: [Methods],

  methods: {
    LogoutHandler() {
      this.$auth.logout()
      location.reload()
    }
  },

  computed: {
    user() {
      var user = this.$auth.user.name + ' ' + this.$auth.user.last_name;
      const max_char = 15;
      if (user.length > max_char) {
        return '...' + user.substring(0, max_char)
      }else {
        return user
      }
    }
  }
}
</script>
