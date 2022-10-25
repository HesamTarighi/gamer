<template>
  <div class="w-full">
    <Alert/>
    <Forms :title="'بازیابی رمز عبور'" :submit_btn="'تایید'" :Submit="Submit">
      <template #inputs>
        <input type="text" v-model="data.code" placeholder="کد تایید" class="w-full border border-blue1 rounded-full px-2 py-1">
      </template>
      <template #elemans>
        <ResendCode/>
      </template>
    </Forms>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {code: '', action: 'verify',},
    }
  },

  methods: {
    Submit() {
      this.$store.dispatch('ForgetPassword', this.data)
    },
  },
}
</script>
