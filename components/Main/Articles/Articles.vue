<template>
  <div>
    <div v-if="articles == '' && articles == null && articles == undefined">
      <Empty :title="'مقاله ای وجود ندارد!'">
        <img src="~/assets/image/empty.png" alt="">
      </Empty>
    </div>

    <div class="space-y-4" v-else>
      <span class="px-4 text-2xl dnSans"> {{ title }} </span>
      <div :class="`w-full relative z-20 grid grid-cols-${grid.cols} gap-4`">
        <a :href="'/articles/' + article.id" v-for="(article, index) in articles" :key="index" :class="`col-span-${grid.span[index]}`">
          <div :class="`w-full h-72 px-4 py-2 flex items-end rounded-lg relative overflow-hidden cards`">
            <div class="relative z-20 text-white">
              <div class="opacity-90 article-name"> {{ article.title }} </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Empty from '~/components/Empty.vue'

export default {
  components: { Empty },

  props: {
    articles: {type: Array, required: true},
    grid: {type: Object, required: true},
    title: {type: String, required: false},
  },
}
</script>

<style scoped>
  .cards {
    background-image: url('~/assets/image/elden.jpg');
    background-size: cover;
    background-position-x: 50%;
    transition: all .3s;
  }

  .article-name {
    transition: all .3s;
  }

  .cards::before {
    content: '';
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to top, rgb(0, 0, 0, 0.8), rgb(0, 0, 0, 0.6));
    position: absolute;
    top: 0;
    left: 0;
    transition: all .3s;
  }

  /* .cards:hover {
    transform: translateY(-10px);
  } */

  .cards:hover::before {
    opacity: 0;
  }

  .cards:hover .article-name {
    opacity: 0;
  }
</style>
