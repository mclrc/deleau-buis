<template>
	<div id="banner" :style="{ backgroundImage: `url(${page.bannerImage || '/img/startbild.jpg'})`, }"></div>
</template>

<script setup lang="ts">
const { page } = useContent()
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
