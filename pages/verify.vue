<template>
  <div class="w-full">
    <Alert/>
    <Forms :title="'تایید حساب کاربری'" :submit_btn="'تایید'" :Submit="Submit">
      <template #inputs>
        <input type="text" v-model="code" placeholder="کد تایید" class="w-full border border-blue1 rounded-full px-2 py-1">
      </template>
      <template #elemans>
        <ResendCode/>
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
      code: null,
    }
  },

  methods: {
    Submit() {
      this.$store.dispatch('Verify', this.code)
    },
  },
}
</script>
