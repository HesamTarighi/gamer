<template>
  <div class="absolute top-4 right-4 overflow-x-hidden space-y-4 pl-12 flex flex-col items-start z-100" v-if="alerts != '' && alerts != null && alerts != undefined">
    <div class="bg-white rounded-tl-lg rounded-bl-lg overflow-y-hidden relative alert-box" v-for="(alert, index) in alerts" :key="index" :class="alert[1] ? 'active' : 'de-active'">
      <div class="flex items-center px-4 alert">
        <div>
          <div :class="`w-1 h-full bg-${color(alert[0].type)}1 absolute top-0 right-0`"></div>
          <button class="mr-1 ml-4 text-xl"> <fa :icon="['fas', 'xmark']" @click="DeleteAlert(index, 1)"/> </button>
        </div>

        <div class="border-r border-gray1 px-1"> {{ alert[0].message }} </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    alerts() {
      if (this.$store.state.alerts[this.$store.state.alerts.length -1] != null && this.$store.state.alerts[this.$store.state.alerts.length -1][0].message != '' && this.$store.state.alerts[this.$store.state.alerts.length -1][0].message != null && this.$store.state.alerts[this.$store.state.alerts.length -1][0].message != '') {

        console.log(this.$store.state.alerts[this.$store.state.alerts.length -1][0]);

        this.$store.commit('ShowAlert', '')

        if (this.$store.state.alerts.length > 6) {
          this.DeleteAlert(0, 1)
        }

        setTimeout(() => {
          this.DeleteAlert(0, 1)
        },3000)

        return this.$store.state.alerts
      }
    },
  },

  created() {
    this.DeleteAlert(0, this.$store.state.alerts.length)
  },

  methods: {
    color(type) {
      let color;
      switch (type) {
        case 'success':
          color = 'green'
          break;
        case 'warning':
          color = 'yellow'
          break;
        case 'error':
          color = 'red'
          break;
      }

      return color
    },

    DeleteAlert(start, count) {
      this.$store.commit('DeleteAlert', [start, count])
    },
  },
}
</script>

<style scoped>
  .alert {
    min-width: 200px;
    min-height: 50px;
  }

  .alert-box {
    transform: translateX(500px);
  }

  .active {
    animation: active .4s forwards;
  }

  .de-active {
    animation: de-active .6s forwards;
  }

  /* Animations */

  @keyframes active {
    0% {
      transform: translateX(500px);
    }

    100% {
      transform: translateX(0);
    }
  }

  @keyframes de-active {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(-20px);
    }

    100% {
      transform: translateX(500px);
    }
  }
</style>
