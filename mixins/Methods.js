export default {
  data() {
    return {
      toggle: false,
    }
  },

  methods: {
    // Toggle element
    ChangeToggle() {
      this.toggle = !this.toggle
    },

    OpenToggleBox() {
      this.toggle = true
    },

    // Close element with window event
    CloseToggleBox(e) {
      if (!e.target.matches('button') && !e.target.parentNode.matches('button') && !e.target.parentNode.parentNode.matches('button')) {
        this.toggle = false;
      }
    },

    FilterProducts(sort) {
      if (this.$store.state.products != null && this.$store.state.products != '' && this.$store.state.products != undefined) {
        const type = this.$store.state.products.filter((product) => {
          return JSON.parse(product.type)[0] == sort;
        })

        const discount = this.$store.state.products.filter((product) => {
          return product.discount > 0;
        })

        const all = this.$store.state.products.filter((product) => {
          return product;
        })

        switch (sort) {
          case 'discounts':
            return discount
            break;

          case 'all':
            return all
            break;

          case 'best':
            return best
            break;

          default:
            return type
            break;
        }
      }
    },

    // Slice items
    DataCount(data, count) {
      if (data != null) {
        return data.slice(0, count)
      }
    },

    //Similar products
    Similars(data, current_data) {
      return data.filter((item) => item.id != current_data.id)
    },

    // Not Draggable
    NotDraggable(e) {
      e.preventDefault();
    }
  },

  mounted() {
    window.addEventListener("click", (e) => this.CloseToggleBox(e))
  },
}
