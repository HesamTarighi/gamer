export default {
  head: {
    title: 'Gamer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    './static/settings-css.css',
    './static/custom-ui/variabels.css',
    './static/custom-ui/colors.css',
    './static/custom-ui/size.css',
    './static/custom-ui/position.css',
    './static/custom-ui/fonts.css',
    './static/custom-ui/direction.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true, regular: true, brands: true,
    },
  },

  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          maxAge: 60 * 60 * 24 * 1,
        },
        refreshToken: {
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token', },
          logout: { url: '/logout', method: 'delete' },
          user: { url: '/user', method: 'get', propertyName: 'user' },
          logout: false
        }
      },
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8080/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    BASE_URL: {
      signin: '/signin',
      login: '/login',
      logout: '/logout',
      verify: '/verify',
      user: '/user',
      types: '/types',
      products: '/products',
      categories: '/categories',
      highlights: '/highlights',
      articles: '/articles',
      forget_password: '/forget_password',
      resend_code: '/resend_code',
      cart: {
        update: '/update_cart',
        add: '/add_to_cart',
        delete: '/delete_cart',
        get: '/get_cart',
        count: '/count_cart',
        total_price: '/total_price',
      },
    }
  }
}
