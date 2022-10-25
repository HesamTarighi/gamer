<template>
  <div class="w-full">
    <Alert/>
    <Forms :title="'بازیابی رمز عبور'" :submit_btn="'تغییر'" :Submit="Submit">
      <template #inputs>
        <input type="text" v-model="data.password" placeholder="رمز عبور" class="w-full border border-blue1 rounded-full px-2 py-1">
        <input type="text" v-model="data.re_password" placeholder="تکرار رمز عبور" class="w-full border border-blue1 rounded-full px-2 py-1">
      </template>
    </Forms>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {password: '', re_password: '', action: 'change',},
    }
  },

  methods: {
    Submit() {
      this.$store.dispatch('ForgetPassword', this.data)
    },
  },
}
</script>
