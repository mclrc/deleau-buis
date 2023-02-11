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
#banner {
  display: block;
  width: 100vw;
  height: 40vh;
  max-height: 40vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
