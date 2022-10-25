<template>
  <div class="w-full">
    <Alert/>
    <Forms :title="'ورود'" :links="[{name: 'ساخت حساب کاربری', label: 'حساب کاربری ندارید', href: 'signin'}, {name: 'فراموشی رمز عبور', href: 'forget_password/'}]" :Submit="Submit">
      <template #inputs>
        <input type="text" v-model="data.email" placeholder="ایمیل" class="w-full border border-blue1 rounded-full px-2 py-1">
        <input type="text" v-model="data.password" placeholder="رمز عبور" class="w-full border border-blue1 rounded-full px-2 py-1">
      </template>
    </Forms>
  </div>
</template>

<script>
import Gust from '~/middleware/Gust.js';
export default {
  middleware: Gust,

  data() {
    return {
      data: {email: '', password: ''},
    }
  },

  methods: {
    Submit() {
      this.$store.dispatch('Login', this.data)
    }
  },
}
</script>
