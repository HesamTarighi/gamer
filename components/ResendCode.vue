<template>
  <div class="txt-blue1 underline flex gap-2">
    <span :class="`${value > 0 ? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer'}`" @click="Resend()"> ارسال دوباره کد تایید </span>
    <Timer :timer="timer"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 60,
    }
  },

  computed: {
    timer() {
      setTimeout(() => {
        if (this.value > 0) {
          this.value-=1
        }
      }, 1000);

      return this.value
    },
  },

  methods: {
    Resend() {
      if (value == 0) {
        this.$axios.$get(process.env.BASE_URL.resend_code)
        .then((res) => this.$store.commit('SetAlert', res))
      }
    }
  },
}
</script>
