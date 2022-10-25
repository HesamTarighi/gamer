export default {
  async nuxtServerInit({commit, dispatch}, {$axios, $cookies, $auth}) {
    await $axios.$get(process.env.BASE_URL.types)
    .then((res) => commit('Types', res))

    await $axios.$get(process.env.BASE_URL.products)
    .then((res) => commit('Products', res))

    await $axios.$get(process.env.BASE_URL.categories)
    .then((res) => commit('Categories', res))

    await $axios.$get(process.env.BASE_URL.articles)
    .then((res) => commit('Articles', res))

    await $axios.$get(process.env.BASE_URL.highlights)
    .then((res) => commit('Highlights', res))

    await dispatch('UpdateCart', '')
    await dispatch('GetCart', '')
    await dispatch('CartTotalPrice', '')
    await dispatch('CountCart', '')
  },

  async Signin({commit}, data) {
    const CheckUser = (res) => {
      if (res.successful != undefined && res.successful == true) {
        document.cookie = `signin=${res.cookie}; expires=; path=/;`
        this.$router.push('/verify')
      }
      commit('SetAlert', res)
    }

    await this.$axios.$post(process.env.BASE_URL.signin, data)
    .then((res) => CheckUser(res))
  },

  async Login({commit}, data) {
    this.$auth.loginWith('local', {
      data: data,
    }).then((res) => {
      if (res.loggedIn) {
        this.$router.push('/')
      }
      commit('SetAlert', res.data)
    })
  },

  async Verify({commit, dispatch}, code) {
    const Check = (res) => {
      if (res.successful != undefined && res.successful == true) {
        dispatch('Login', res.data)
      }
      commit('SetAlert', res)
    }

    await this.$axios.$post(process.env.BASE_URL.verify, {code})
    .then((res) => Check(res))
  },

  async ForgetPassword({commit}, data) {
    const Check = (res) => {
      if (res.successful != undefined && res.successful == true) {
        switch (data.action) {
          case 'email':
            document.cookie = `forget_password_email=${res.cookie}; expires=; path=/;`
            this.$router.push('/forget_password/verify')
            break;

          case 'verify':
            document.cookie = `forget_password_verify=${res.cookie}; expires=; path=/;`
            this.$router.push('/forget_password/change_password')
            break;

          case 'change':
            this.$router.push('/login')
            break;
        }
      }
      commit('SetAlert', res)
    }

    await this.$axios.$put(process.env.BASE_URL.forget_password, data)
    .then((res) => Check(res))
  },

  async GetCart({commit}, data) {
    await this.$axios.$get(process.env.BASE_URL.cart.get)
    .then((res) => commit('Cart', res))
  },

  async AddToCart({commit, dispatch}, data) {
    await this.$axios.$post('/add_to_cart', data)
    .then((res) => console.log(res))

    await dispatch('CountCart', '')
  },

  async DeleteFromCart({commit, dispatch}, id) {
    await this.$axios.$delete(process.env.BASE_URL.cart.delete + `?id=${id}`)
    .then((res) => commit('SetAlert', res))

    await dispatch('GetCart', '')
    await dispatch('CartTotalPrice', '')
    await dispatch('CountCart', '')
  },

  async UpdateCart({commit, dispatch}, id) {
    await this.$axios.$delete(process.env.BASE_URL.cart.update)
    .then((res) => commit('SetAlert', res))

    await dispatch('GetCart', '')
    await dispatch('CartTotalPrice', '')
    await dispatch('CountCart', '')
  },

  async CartTotalPrice({commit}, data) {
    await this.$axios.$get(process.env.BASE_URL.cart.total_price)
    .then((res) => commit('CartTotalPrice', res))
  },

  async CountCart({commit}, data) {
    await this.$axios.$get(process.env.BASE_URL.cart.count)
    .then((res) => commit('CountCart', res))
  },
}
