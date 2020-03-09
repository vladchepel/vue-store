<template>
  <form v-click-outside="hideDropdown" class="search" :class="{'search--active': dropdownVisible}">
    <input
      type="text"
      class="search__input"
      placeholder="Search"
      @input="handleInput"
      @focus="isActive = true"
    >
    <div class="search__icon">
      <SvgIcon name="search"/>
    </div>

    <div v-if="dropdownVisible" class="search__result">
      <div
        v-for="item in foundItems"
        :key="item.id"
        class="search__result-item"
        @click="handleClick(item.id)"
      >
        <img :src="`${publicPath}img/${item.image}`" class="search__img">
        <div class="search__name">{{ item.name }}</div>
      </div>
    </div>
  </form>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
import { mapState } from 'vuex';

let timeout;

export default {
  name: 'Search',
  components: { SvgIcon },
  data() {
    return {
      foundItems: [],
      isActive: false,
    };
  },
  computed: {
    ...mapState(['products']),
    dropdownVisible() {
      return this.foundItems.length > 0 && this.isActive;
    },
    publicPath() {
      return process.env.BASE_URL;
    }
  },
  methods: {
    handleInput(e) {
      const value = e.target.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.foundItems = this.products.filter(product => {
          return value && product.name.toLowerCase().includes(value.toLowerCase())
        });
        this.isActive = true;
      }, 300);
    },
    hideDropdown() {
      this.isActive = false;
    },
    handleClick(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style lang="scss">
.search {
  position: relative;
  width: 100%;
  max-width: 500px;
  box-shadow: $shadow;
  border-radius: $border-radius;

  &__input {
    width: 100%;
    height: 50px;
    padding-right: 50px;
    padding-left: 22px;
    border: 0;
    outline: none;
    border-radius: $border-radius;
    background-color: #fff;

    .search--active & {
      border-radius: $border-radius $border-radius 0 0;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-45%);
    color: #999;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  &__result {
    position: absolute;
    z-index: 100;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: $shadow;
    border-top: 1px solid #ccc;
    background-color: #fff;
    border-radius: 0 0 $border-radius $border-radius;

    &-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 6px 10px;
      transition: background-color 0.15s;

      &:hover {
        background-color: #f5f5f5;
      }

      & + & {
        border-top: 1px solid #ddd;
      }
    }
  }

  &__img {
    max-width: 34px;
    height: auto;
    margin-right: 10px;
  }
}
</style>
