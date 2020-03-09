<template>
  <div v-if="cart.length > 0" v-click-outside="clickOutside" class="cart">
    <div v-for="(item, i) in cart" :key="item.id" class="cart__item">
      <img :src="`${publicPath}img/${item.image}`" class="cart__img">
      <div class="cart__item-content">
        <div class="cart__name">{{ item.name }}</div>
        <div class="cart__price">${{ item.price }}</div>
      </div>

      <Number v-model="cart[i].quantity" class="cart__number"/>

      <button class="cart__remove" type="button" @click="removeItem(i)">
        <SvgIcon name="cross"/>
      </button>
    </div>

    <div class="cart__total">
      <div class="cart__total-label">Total:</div>
      <div class="cart__total-value">${{ total }}</div>
    </div>

    <button class="cart__btn" type="button">Checkout</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Number from '@/components/Number.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Cart',
  components: { SvgIcon, Number },
  computed: {
    ...mapState(['products', 'cart']),
    total() {
      const result = this.cart.reduce((sum, current) => current.price * current.quantity + sum, 0);
      return result ? result : 0;
    },
    publicPath() {
      return process.env.BASE_URL;
    }
  },
  methods: {
    clickOutside() {
      this.$router.push('/');
    },
    removeItem(index) {
      this.cart.splice(index, 1);
    }
  },
};
</script>

<style lang="scss">
.cart {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  padding-top: 10px;
  border-radius: 30px 0 0 30px;
  background-color: #fff;
  box-shadow: -1px 0 2px rgba(#000, 0.16);
  overflow: auto;

  &__item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #ddd;
  }

  &__img {
    max-width: 50px;
    height: auto;
    margin-right: 10px;
  }

  &__price {
    margin-left: auto;
    font-weight: 500;
  }

  &__btn {
    @extend %clear-btn;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    background-color: $brand-color;
    color: #fff;
    text-transform: uppercase;
    font-weight: 500;
    flex-shrink: 0;
  }

  &__number {
    margin-left: auto;
  }

  &__total {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    font-size: 20px;
    font-weight: 500;

    &-value {
      font-weight: 700;
    }
  }

  &__remove {
    @extend %clear-btn;
    display: flex;
    align-items: center;
    margin-left: 5px;

    .icon {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
