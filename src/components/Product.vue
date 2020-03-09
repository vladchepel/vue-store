<template>
  <div v-if="product" class="product" v-click-outside="clickOutsideConfig">
    <button class="product__close" type="button" @click="close">
      <SvgIcon name="cross"/>
    </button>
    <img :src="imagePath" class="product__img">
    <h2 class="product__name">{{ product.name }}</h2>
    <Rating class="product__rating" :value="product.rating"/>
    <div class="product__price">${{ product.price }}</div>
    <ul class="product__specs">
      <li v-for="(value, key) in product.specs" :key="key" class="product__spec-item">
        <strong>{{ key }}</strong>: {{ value }}
      </li>
    </ul>

    <button v-if="!btnDisabled" @click="handleClick" class="product__btn" type="button">
      Add To Cart
    </button>

    <div v-else class="product__btn product__btn--disabled">Added</div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';
import { mapMutations, mapState } from 'vuex';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Product',
  components: { SvgIcon, Rating },
  data() {
    return {
      clickOutsideConfig: {
        handler: () => {
          this.$router.push('/');
        },
        middleware(e) {
          return !(e.target.closest('.product-card') || e.target.closest('.search'));
        },
      },
    };
  },
  computed: {
    ...mapState(['products', 'cart']),
    product() {
      return this.products.find(product => product.id === Number(this.$route.params.id));
    },
    imagePath() {
      return `/img/${this.product.image}`;
    },
    btnDisabled() {
      return !!this.cart.find(item => this.product.id === item.id);
    },
  },
  methods: {
    ...mapMutations(['addToCart']),
    handleClick() {
      this.addToCart({ ...this.product, quantity: 1 });
    },
    close() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.product {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 360px;
  padding: 20px 30px 0;
  border-radius: 30px 0 0 30px;
  background-color: #fff;
  box-shadow: -1px 0 2px rgba(#000, 0.16);
  overflow: auto;

  &__close {
    @extend %clear-btn;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background-color: #333;
    color: #fff;
    border-radius: 0 0 0 50px;

    .icon {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      margin-bottom: 8px;
    }
  }

  &__img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  &__name {
    margin-bottom: 10px;
  }

  &__rating {
    margin-bottom: 12px;
  }

  &__price {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__specs {
    padding: 0;
    margin: 0 0 20px;
    list-style-type: none;

    strong {
      text-transform: capitalize;
    }
  }

  &__btn {
    @extend %clear-btn;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    margin-top: auto;
    background-color: $brand-color;
    color: #fff;
    text-transform: uppercase;
    font-weight: 500;
    margin-left: -30px;
    margin-right: -30px;
    flex-shrink: 0;

    &--disabled {
      background-color: #ddd;
      color: $text-color;
    }
  }
}
</style>
