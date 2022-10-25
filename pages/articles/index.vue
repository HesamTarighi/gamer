<template>
  <div>
    <section class="flex justify-center">
      <div class="w-2/3">
        <Articles :articles="articles_api" :grid="grid"/>
      </div>
    </section>
  </div>
</template>

<script>
// Components
import Articles from '~/components/Main/Articles/Articles.vue';

// Api
import articles_api from '~/api/articles.json'

export default {
  components: { Articles },

  asyncData(context, callback) {
    callback(null, {
      articles_api,
    })
  },

  computed: {
    grid() {
      const last = this.articles_api.length -1
      const mid = Math.floor((this.articles_api.length -1) / 2)
      const grid = {
        cols: 5,
        span: {
          0: 2,
          [mid]: 2,
          [last]: 2
        }
      }

      return grid
    }
  }
}
</script>
