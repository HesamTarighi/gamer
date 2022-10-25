<template>
  <!-- Root element -->
  <div id="root" class="rtl">
    <!-- Nav -->
    <nav class="w-full flex justify-center shadow-xl border-b border-gray-300"> <NavBase /> </nav>
    <!-- Main -->
    <main class="min-h-screen bg-white1 relative pb-8" :class="$route.path != '/' ? 'pt-8' : ''">
      <Nuxt />
      <Alert />
    </main>
    <!-- Footer -->
    <footer class="relative"> <FooterBase /> </footer>
  </div>
</template>

<script>
  import NavBase from '~/components/Base/NavBase.vue';
  import FooterBase from '~/components/Base/FooterBase.vue';
  export default {
    components: {
      NavBase,
      FooterBase
    },
  }
</script>

<style scoped>
  footer {
    min-height: 150px;
    background-image: url('~/assets/image/footer2.jpg');
    background-attachment: fixed;
    background-size: cover;
    background-position-y: 0%;
    background-repeat: no-repeat;
  }

  footer::before {
    content: '';
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .9;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
