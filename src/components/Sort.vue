<template>
  <div class="sort">
    <div class="sort__label">Sort by:</div>
    <Select @input="handleSortChange" :options="sortOptions"/>
  </div>
</template>

<script>
import Select from '@/components/Select.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Sort',
  components: { Select },
  data() {
    return {
      sort: '',
    };
  },
  computed: {
    ...mapState(['sortOptions']),
  },
  methods: {
    ...mapMutations(['setSort']),
    handleSortChange(value) {
      this.setSort(value);
    },
  },
};
</script>

<style lang="scss">
.sort {
  display: flex;
  align-items: center;

  &__label {
    margin-right: 15px;
    font-weight: 500;
  }
}
</style>
