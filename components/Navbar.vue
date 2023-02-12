<template>
  <div
    id="navbar"
    @scroll="onScroll"
    :class="{ scrolled: scrolled, collapsed: collapsed }"
  >
    <nav>
      <header id="branding">
        <router-link to="/"><h1>Palais Deleau</h1></router-link>
      </header>
      <ul id="links">
        <ContentNavigation v-slot="{ navigation }">
          <li class="nav-entry" v-for="link of navigation" :key="link._path">
            <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
          </li>
        </ContentNavigation>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
} from 'vue';

import { useRoute } from 'vue-router';

const scrolled = ref(false);
const collapsed = ref(true);
const scrollThreshold = 5;

const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    collapsed.value = true;
    if (document.firstElementChild !== null)
      document.firstElementChild.scrollTop = 0;
  }
);

function onScroll() {
  if (document.firstElementChild !== null)
    scrolled.value = document.firstElementChild.scrollTop > scrollThreshold;
}
onMounted(() => document.addEventListener("scroll", onScroll));
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Radley&display=swap");
@import "@/assets/style/vars.scss";

$expand-collapse-anim-time: 0.2s;

#navbar {
  position: sticky;
  user-select: none;
  z-index: 1001; // Has to be > 1000 because of the leaflet controls
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  font-family: "Quicksand";
  &.scrolled,
  &:not(.collapsed) {
    background-color: white;
    color: $text-color;
    box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.1);
  }
  nav {
    padding: 0 1rem;
    width: 100%;
    max-width: $max-content-width;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-items: center;
  }
}
#top {
  height: $navbar-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
#hamburger-menu {
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #route-name {
    font-size: 1rem;
    font-weight: bold;
  }
}
#hamburger {
  background: none;
  border: none;
  outline: none;
  position: relative;
  height: 1.1rem;
  width: 2rem;
  padding: 1rem;
  box-sizing: content-box;
  margin: 0;
  margin-right: -$content-padding;

  cursor: pointer;

  &::before,
  &::after {
    display: block;
    position: absolute;
    content: "";
    height: 4px;
    width: 2rem;
    background-color: black;
    transform-origin: 51% 51%;
  }
  &::before {
    top: 1rem;
  }
  &::after {
    bottom: 1rem;
  }
}
#navbar:not(.collapsed) #hamburger {
  &::before {
    top: calc(50% - 2px);
    transform: rotate(225deg);
  }
  &::after {
    bottom: calc(50% - 2px);
    transform: rotate(-225deg);
  }
}
#branding {
  margin-top: $content-padding;
  line-height: 1.1;
  a {
    color: unset;
    text-decoration: none;
  }
  h1 {
    font-family: "Dancing Script";
    font-size: 1.8rem;
    margin: 0;
    margin: 0 auto;
  }
  h2 {
    font-family: "Quicksand";
    font-weight: 400;
    font-size: 0.7rem;
    margin: 0;
  }
}
#navbar.collapsed #links {
  height: 0;
  a {
    opacity: 0;
    color: inherit;
  }
}
#links {
  height: 20vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-evenly;
  list-style: none;
  margin: 0;
  padding: 0 (4rem - $content-padding); // Hamburger icon width + padding - the negative padding on the right

  a {
    margin: 0.3rem 0;
    display: block;
    color: $text-color;
    font-weight: 500;
    text-decoration: none;
    position: relative;
    &::after {
      display: block;
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      margin: 0 auto;
      bottom: -3px;
      height: 3px;
      opacity: 0;
    }
    &:hover::after {
      background-color: $text-color;
    }
    &.router-link-exact-active::after {
      background-color: $accent-color;
    }
    &.router-link-exact-active::after,
    &:hover::after {
      opacity: 1;
    }
  }
}
@media only screen and (min-width: $breakpoint) {
  nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  #top {
    width: auto;
  }
  #hamburger-menu {
    display: none;
    padding: $content-padding 0;
  }
  #navbar.collapsed #links,
  #navbar:not(.collapsed) #links {
    margin: $content-padding 0;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    #links {
      width: 100%;
      padding: 0;
    }
    a {
      opacity: 1;
    }
    li:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
}
</style>
