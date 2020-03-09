<template>
  <div class="rating">
    <div class="rating__stars-wrap">
      <div class="rating__stars">
        <SvgIcon v-for="n in 5" :key="n" name="star" class="rating__star"/>
      </div>

      <div class="rating__filled-stars" :style="fillWidth">
        <SvgIcon v-for="n in 5" :key="n" name="star" class="rating__star"/>
      </div>
    </div>

    <div class="rating__text">{{ value }}</div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon.vue';

export default {
  name: 'Rating',
  components: { SvgIcon },
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    fillWidth() {
      return `width: ${this.value * 2 * 10 - 1}%`;
    },
  },
};
</script>

<style lang="scss">
.rating {
  display: flex;
  align-items: center;
  line-height: 1;

  &__stars-wrap {
    position: relative;
  }

  &__stars,
  &__filled-stars {
    display: flex;
  }

  &__filled-stars {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }

  &__text {
    margin-top: 1px;
    margin-left: 6px;
    font-weight: 700;
  }

  &__star {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    margin-right: 2px;
    fill: #ccc;

    .rating__filled-stars & {
      fill: #555;
    }
  }
}
</style>
