<template>
  <div class="select" :class="{'select--active': isActive}" v-click-outside="hideDropdown">
    <div class="select__current" @click="toggleDropdown">{{ current }}</div>
    <div class="select__dropdown" v-show="isActive">
      <div
        v-for="option in options"
        :key="option.value"
        class="select__dropdown-item"
        @click="selectItem(option)">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      current: '',
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
    selectItem(option) {
      this.current = option.text;
      this.isActive = false;
      this.$emit('input', option.value);
    },
  },
  created() {
    this.current = this.options[0].text;
    this.$emit('input', this.options[0].value);
  },
};
</script>

<style lang="scss">
.select {
  position: relative;

  &__current {
    display: flex;
    align-items: center;
    padding-left: 22px;
    padding-right: 22px;
    height: 50px;
    background-color: #fff;
    min-width: 240px;
    border-radius: $border-radius;
    cursor: pointer;
    box-shadow: $shadow;
    user-select: none;

    .select--active & {
      border-radius: $border-radius $border-radius 0 0;
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
    border-radius: 0 0 $border-radius $border-radius;
    box-shadow: $shadow;
    border-top: 1px solid #ccc;
    overflow: hidden;
    cursor: pointer;

    &-item {
      padding: 10px 22px;
      font-size: 14px;
      transition: background-color 0.15s;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
