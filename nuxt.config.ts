import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
      ],
      meta: [
        { name: "description", content: "Persönliche Seite von Roland Deleau" },
      ],
    },
  },
  modules: ["@nuxt/content"],
  // @ts-ignore because for some reason extra config keys for plugins are not allowed
  content: {
    documentDriven: true,
    markdown: {
      remarkPlugins: {
        "@microflash/remark-figure-caption": {
          imageClassName: "image",
          captionClassName: "image-caption",
        },
      },
    },
  },
});
