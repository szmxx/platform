import { pwa } from './config/pwa'
import { description } from './package.json'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@vant/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image-edge',
    '@nuxtseo/module',
  ],

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dcro7qdzl/image/upload/assets',
      modifiers: {
        quality: 'auto:best',
        dpr: 'auto',
      },
    },
    domains: ['avatars0.githubusercontent.com'],
  },

  runtimeConfig: {
    public: {
      name: process.env.NUXT_APP_NAME,
    },
  },

  site: {
    titleSeparator: '·',
    defaultLocale: 'zh-CN',
    name: '猫染',
    indexable: true,
    url: process.env.NUXT_PUBLIC_SITE_URL,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  i18n: {
    langDir: 'locales/',
    vueI18n: './nuxt-i18n.ts',
    lazy: true,
    locales: [
      {
        code: 'zh-CN',
        iso: 'zh-CN',
        name: '简体中文',
        file: 'cn.json',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'zh-CN',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  css: ['@unocss/reset/tailwind.css', '@/style/global.scss'],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
        drop: ['console', 'debugger'],
        minify: true,
        minifyWhitespace: true,
        minifySyntax: true,
      },
    },
    minify: true,
    sourceMap: false,
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
      ignore: [],
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
      ],
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1,maximum-scale=1.0,user-scalable=0',
        },
        { name: 'description', content: description },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
      script: [
        {
          src: 'https://hm.baidu.com/hm.js?97ef136179357839bab56968ed27a5a4',
          type: 'text/javascript',
        },
      ],
    },
  },
  imports: {
    dirs: ['store'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
