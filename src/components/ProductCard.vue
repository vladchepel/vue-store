<template>
  <div class="product-card">
    <img :src="imagePath" class="product-card__img">
    <div class="product-card__name">{{ product.name }}</div>
    <Rating v-once :value="product.rating" class="product-card__rating"/>
    <div class="product-card__price">${{ product.price }}</div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  name: 'ProductCard',
  components: { Rating },
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    imagePath() {
      return `/img/${this.product.image}`;
    },
  },
};
</script>

<style lang="scss">
.product-card {
  padding: 25px 25px 20px;
  cursor: pointer;
  border-radius: 14px;
  box-shadow: $shadow;
  background-color: #fff;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 8px 12px -6px rgba(#000, 0.3);
  }

  &__img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  &__name {
    font-size: 18px;
  }

  &__price {
    font-weight: 700;
  }

  &__rating {
    margin-top: 4px;
    margin-bottom: 5px;
  }
}
</style>
