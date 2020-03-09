<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" v-model="value.value">
    <span class="checkbox__box">
      <SvgIcon name="check"/>
    </span>
    <span class="checkbox__label">{{ label }}</span>
  </label>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';
export default {
  name: 'Checkbox',
  components: { SvgIcon },
  props: {
    label: {
      type: String,
    },
    value: {
      type: Object,
      required: true,
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value)
    },
  },
};
</script>

<style lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  user-select: none;

  &__input {
    display: none;
  }

  &__box {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid #aaa;
    margin-right: 8px;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      transform: translate(-50%, -50%);
      color: $text-color;
      visibility: hidden;

      .checkbox__input:checked + & {
        visibility: visible;
      }
    }
  }
}
</style>
