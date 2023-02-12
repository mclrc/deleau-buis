<template>
  <div
    id="banner"
    :style="{
      backgroundImage: `url(${
        page.bannerImage ||
        '/img/vue-sur-buis-2016-acrylic-toile-60-x-80-cm-kopie.jpg'
      })`,
    }"
  ></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef
const { page } = useContent();
</script>

<style scoped lang="scss">
@import "@/assets/style/vars.scss";
#banner {
  display: block;
  max-width: $max-content-width;
  height: 400px;
  max-height: 50vh;
  margin: 0 auto;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
