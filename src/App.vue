<template>
  <div class="page__app" id="app">
    <PageHeader class="page__header"/>
    <PageContent class="page__content"/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageContent from '@/components/Products.vue';

export default {
  name: 'App',
  components: { PageContent, PageHeader }
}
</script>

<style lang="scss">

</style>
