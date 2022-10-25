<template>
  <div class="w-full">
    <Alert/>
    <Forms :title="'بازیابی رمز عبور'" :submit_btn="'تایید'" :Submit="Submit">
      <template #inputs>
        <input type="text" v-model="data.email" placeholder="ایمیل" class="w-full border border-blue1 rounded-full px-2 py-1">
      </template>
    </Forms>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {email: '', action: 'email',},
    }
  },

  methods: {
    Submit() {
      this.$store.dispatch('ForgetPassword', this.data)
    }
  },
}
</script>
