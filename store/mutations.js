export default {
  ChangeType(state, type) {
    state.sort_by = type;
  },

  Types(state, data) {
    state.types = data
  },

  Products(state, data) {
    state.products = data
  },

  Articles(state, data) {
    state.articles = data
  },

  Categories(state, data) {
    state.categories = data
  },

  Highlights(state, data) {
    state.highlights = data
  },

  Cart(state, data) {
    state.cart = data
  },

  CountCart(state, data) {
    state.count_cart = !data.message ? data : 0
  },

  CartTotalPrice(state, data) {
    state.total_price = data
  },

  SetSortName(state, id) {
    state.sort_by = id
  },

  SetAlert(state, res) {
    state.alerts.push([res, false]);
  },

  ShowAlert(state, data) {
    state.alerts[state.alerts.length -1][1] = true
  },

  DeleteAlert(state, [start, count]) {
    state.alerts.splice(start, count)
  }
}
