<template>
  <div class="w-full">
    <Alert/>
    <Forms :title="'ثبت نام'" :links="[{name: 'وارد شوید', label: 'حساب کاربری دارید', href: 'login'}]" :Submit="Submit">
      <template #inputs>
        <input type="text" v-model="data.name" placeholder="نام" class="w-full border border-blue1 rounded-full px-2 py-1">
        <input type="text" v-model="data.last_name" placeholder="نام خانوادگی" class="w-full border border-blue1 rounded-full px-2 py-1">
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
      data: {name: '', last_name: '', email: '', password: ''},
    }
  },

  methods: {
    Submit() {
      this.$store.dispatch('Signin', this.data)
    }
  },
}
</script>
