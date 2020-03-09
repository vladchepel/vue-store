<template>
  <div class="filter" v-click-outside="hideDropdown">
    <button @click="toggleDropdown" class="btn filter__btn" type="button">
      <SvgIcon name="filter"/>
      Filter
    </button>

    <div v-show="isActive" class="filter__dropdown">
      <div class="filter__item">
        <div class="filter__label">Brands</div>
        <div class="filter__checkboxes">
          <Checkbox v-for="(item, index) in value" :key="item.name" :label="item.name" v-model="value[index]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
import Checkbox from '@/components/Checkbox.vue';

export default {
  name: 'ProductsFilter',
  components: { Checkbox, SvgIcon },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isActive = !this.isActive;
    },
    hideDropdown() {
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss">
.filter {
  position: relative;

  &__btn {

    .icon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 300px;
    background-color: #fff;
    border-radius: $border-radius;
    padding: 16px 22px;
    filter: drop-shadow(0 2px 2px rgba(#000, 0.12));
    display: flex;

    &:after {
      content: '';
      position: absolute;
      bottom: calc(100% - 4px);
      right: 30px;
      width: 8px;
      height: 8px;
      background-color: #fff;
      transform: rotate(45deg);
    }
  }

  &__label {
    font-weight: 500;
    margin-bottom: 6px;
  }

  &__item {
    flex: 1;
  }

  &__checkboxes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }
}
</style>
