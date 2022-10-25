<template>
  <div>
    <div>
      <section class="w-full flex justify-center">
        <div class="w-2/3 rounded-xl px-4 py-2 space-y-8">
          <div>
            <div class="flex items-center justify-between">
              <h1 class="px-4 py-4 txt-blue1 text-3xl font-bold"> {{ article.title }} </h1>
            </div>
            <div class="rounded-2xl overflow-hidden">
              <img :src="require('~/assets/image/' + article.image)" class="rounded-2xl cover">
            </div>
          </div>

          <div>
            <div v-for="(description, index) in JSON.parse(article.description)" :key="index" class="space-y-4 py-6">
              <h2 class="text-2xl font-bold"> {{ description.title }} </h2>
              <p>
                {{ description.text }}
              </p>
              <hr>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full flex justify-center" v-if="Similars(articles, article) != ''">
        <div class="w-2/3 space-y-4">
          <Articles :articles="DataCount(Similars(articles, article), 5)" action="default" :grid="{cols: 5, span: 1}" :title="'مقالات مشابه'"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// Components
import Articles from '~/components/Main/Articles/Articles.vue'

// Mixins
import Methods_Mixin from '~/mixins/Methods.js'

export default {
  components: { Articles },

  mixins: [ Methods_Mixin ],

  asyncData(context, callback) {
    callback(null, {
      articles: context.store.state.articles,
      id: context.route.params.id,
    })
  },

  computed: {
    article() {
      return this.articles.filter((article) => article.id == this.id)[0]
    },
  },
}
</script>

<style scoped>
  .cover {
    transition: all .4s;
  }

  .cover:hover {
    transform: scale(1.2);
  }
</style>
