export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseURL: 'http://localhost:5003',
    }
  },

  app: {
    head: {
      title: 'Dashby', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:5003/**'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/fonts',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },

  fonts: {
    families: [
      { name: 'Nunito', weights: [300, 400, 700] },
      { name: 'Roboto', weights: [400] }
    ]
  },

  // components: [
  //   {
  //     path: '~/components',
  //     pathPrefix: false
  //   }
  // ]
})