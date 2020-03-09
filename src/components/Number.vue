<template>
  <div class="number">
    <button class="number__btn number__btn--plus" type="button" @click="handlePlus">
      <SvgIcon name="angle-up"/>
    </button>

    <div class="number__current">{{ current }}</div>

    <button class="number__btn number__btn--minus" type="button" @click="handleMinus">
      <SvgIcon name="angle-down"/>
    </button>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
export default {
  name: 'Number',
  components: { SvgIcon },
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      current: this.value,
    };
  },
  methods: {
    handleMinus() {
      let result = this.current - 1;
      if (result <= this.min) result = this.min;
      this.current = result;
      this.$emit('input', result);
    },
    handlePlus() {
      let result = this.current + 1;
      if (result >= this.max) result = this.max;
      this.current = result;
      this.$emit('input', result);
    },
  },
};
</script>

<style lang="scss">
.number {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;

  &__current {
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 5px;
    user-select: none;
  }

  &__btn {
    @extend %clear-btn;
    display: flex;
    align-items: center;

    .icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
