<template>
  <main class="products">
    <div class="products__container">
      <div class="products__header">
        <h1 class="products__title">Products</h1>
        <Sort class="products__sort"/>
        <ProductsFilter v-model="filterOptions"/>
      </div>

      <div class="products__items">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @click.native="openProduct(product.id)"
        />
      </div>
    </div>

    <router-view/>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapState } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';
import Sort from '@/components/Sort.vue';
import ProductsFilter from '@/components/ProductsFilter.vue';

export default {
  name: 'PageContent',
  components: { ProductsFilter, Sort, ProductCard },
  computed: {
    ...mapState(['products', 'filterOptions']),
    ...mapGetters(['filteredProducts']),
  },
  methods: {
    ...mapMutations(['setProducts', 'setFilterOptions']),
    openProduct(id) {
      this.$router.push(`/product/${id}`);
    }
  },
  async created() {
    let request;
    try {
      request = await axios.get('https://gist.githubusercontent.com/vladchepel/62ad8d4276c74bc17f3213f3a203bf6d/raw/ba312de1ea8a2d8d59c449a304dec7fdd44f8a82/products.json');
      const products = request.data;
      this.setProducts(products);
      const brands = products.map(product => product.brand);
      this.setFilterOptions([...new Set(brands)].map(brand => ({ name: brand, value: true })));
    } catch (e) {
      throw new Error(e);
    }
  }
};
</script>

<style lang="scss">
.products {
  padding-top: 80px;
  padding-bottom: 40px;

  &__container {
    @extend %container;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }

  &__title {
    font-size: 34px;
    margin-bottom: 0;
    margin-right: auto;
  }

  &__items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
  }

  &__sort {
    margin-right: 30px;
  }
}
</style>
