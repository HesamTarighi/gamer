<template>
  <div>
    <svg width="30" height="30">
      <circle cx="15" cy="15" :r="r" style="stroke-width: 2; stroke: #1089FF; fill: none; stroke-dasharray: 88; transition: all .5s;" :style="`stroke-dashoffset: ${circle};`"/>
      <text x="24" y="21" class="small"> {{ timer }} </text>
    </svg>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        r: 14,
      }
    },

    props: [
      'timer'
    ],

    computed: {
      circle() {
        const calc = (this.r * 2) * Math.PI;
        const max = 60;

        const dashoffset = ((max - this.timer) / max) * calc;

        return dashoffset;
      }
    }
  }
</script>
