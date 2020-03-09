import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sort: '',
    products: [],
    sortOptions: [
      {
        text: 'Name: A-Z',
        value: 'name:asc'
      },
      {
        text: 'Name: Z-A',
        value: 'name:desc'
      },
      {
        text: 'Price: Low to High',
        value: 'price:asc'
      },
      {
        text: 'Price: High to Low',
        value: 'price:desc'
      },
      {
        text: 'Rating: Low to High',
        value: 'rating:asc'
      },
      {
        text: 'Rating: High to Low',
        value: 'rating:desc'
      },
    ],
    cart: [],
    filterOptions: [],
  },
  getters: {
    sortedProducts(state, getters) {
      let sorted = state.products.sort((a, b) => {
        let aValue = a[getters.sortKey];
        let bValue = b[getters.sortKey];

        if (aValue === 'name' && bValue === 'name') {
          aValue = aValue.toLowerCase();
          aValue = bValue.toLowerCase();
        }

        if (aValue > bValue) return 1;
        if (aValue < bValue) return -1;
        return 0;
      });

      if (getters.sortDirection === 'desc') {
        sorted.reverse()
      }

      return sorted;
    },
    filteredProducts(state, getters) {
      const result = [];
      getters.sortedProducts.forEach((product) => {
        state.filterOptions.forEach(option => {
          if (product.brand === option.name && option.value) {
            result.push(product);
          }
        });
      });
      return result;
    },
    sortKey(state) {
      return state.sort.split(':')[0];
    },
    sortDirection(state) {
      return state.sort.split(':')[1];
    },
    brands(state) {
      return state.products.map(product => ({ title: product.name.split(' ')[0] }));
    },
    cartItemCount(state) {
      return state.cart.length;
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setSort(state, value) {
      state.sort = value;
    },
    addToCart(state, id) {
      state.cart.push(id);
    },
    setFilterOptions(state, options) {
      state.filterOptions = options;
    },
  },
  actions: {},
  modules: {}
});
