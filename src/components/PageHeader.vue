<template>
  <header class="page-header">
    <div class="page-header__container">
      <div class="page-header__brand">Vue Store</div>

      <Search class="page-header__search"/>

      <button v-if="cartItemCount > 0" class="page-header__cart" @click="handleClick">
        <SvgIcon name="cart"/>
        <span v-if="cartItemCount" class="badge">{{ cartItemCount }}</span>
      </button>

      <div v-else class="page-header__cart">
        <SvgIcon name="cart"/>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from '@/components/Search.vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'PageHeader',
  components: { SvgIcon, Search },
  computed: {
    ...mapGetters(['cartItemCount'])
  },
  methods: {
    handleClick() {
      this.$router.push('/cart');
    }
  }
};
</script>

<style lang="scss">

.page-header {
  position: relative;
  padding: 20px 0;

  &__brand {
    font-size: 30px;
    font-weight: 900;
    margin-right: auto;
    color: $text-color;
  }

  &__container {
    @extend %container;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr;
  }

  &__search {
    justify-self: center;
  }

  &__cart {
    @extend %clear-btn;
    position: relative;
    display: flex;
    justify-self: end;
    cursor: pointer;

    .icon {
      width: 38px;
      height: 38px;
    }

    .badge {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -20%);
    }
  }
}
</style>
