<template>
  <div class="space-y-24">
    <!-- Highlights image -->
    <section class="w-full flex justify-center pb-16" v-if="highlights_api != null && highlights_api != '' && highlights_api != undefined">
      <div class="w-full">
        <Highlights :highlights="highlights_api"/>
      </div>
    </section>

    <!-- Categories -->
    <section class="w-full flex justify-center">
      <div class="w-2/3">
        <Categories :data="categories_api"/>
      </div>
    </section>

    <!-- Products -->
    <section class="w-full flex justify-center pt-16">
      <div class="w-2/3 space-y-24">
        <!-- All -->
        <Products :products="DataCount(FilterProducts('all'), 9)" action="slider" :title="'تمام محصولات'"/>
        <!-- Discounts -->
        <Products :products="DataCount(FilterProducts('discounts'), 9)" action="slider" :title="'تخفیف ها'"/>
        <!-- Console -->
        <Products :products="DataCount(FilterProducts('console'), 9)" action="slider" :title="'کنسول ها'"/>
        <!-- Accessories -->
        <Products :products="DataCount(FilterProducts('accessories'), 9)" :action="'slider'"/>
      </div>
    </section>

    <!-- Articels -->
    <section class="w-full relative flex items-center justify-center article-box" v-if="articles_api != '' && articles_api != null && articles_api != undefined">
      <div class="w-2/3">
        <div class="w-auto">
          <div class="relative z-20 text-white px-8 text-2xl dnSans"> مقالات بازی ها </div>
          <Articles :articles="DataCount(articles_api, 5)" :grid="{cols: 5, span: {}}" class="px-16" />
          <div class="relative z-20 text-white px-8 py-2 text-md"> <a href="/" class="txt-blue1"> دیدن همه مقالات <fa :icon="['fas', 'arrow-left']"/> </a> </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Components
import Highlights from '~/components/Main/Highlight/Highlight.vue';
import Categories from '~/components/Main/Categories/Categories.vue';
import Products from '~/components/Main/Products/Products.vue';
import Articles from '~/components/Main/Articles/Articles.vue';
// Mixins
import Methods from '~/mixins/Methods.js'

export default {
  name: 'IndexPage',
  components: {
    Highlights, Categories, Products, Articles
  },

  mixins: [ Methods ],

  asyncData(context, callback) {
    callback(null, {
      // Api data
      articles_api: context.store.state.articles,
      categories_api: context.store.state.categories,
      highlights_api: context.store.state.highlights

      // Default data
    });
  },
}
</script>

<style scoped>
  .article-box {
    min-height: 500px;
    background-image: url('~/assets/image/elden.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 100%;
    background-attachment: fixed;
  }

  .article-box::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .2;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
</style>
