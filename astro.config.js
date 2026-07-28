import cloudflare from '@astrojs/cloudflare'
import { satteri } from '@astrojs/markdown-satteri'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import sentry from '@sentry/astro'
import tailwindcss from '@tailwindcss/vite'
import pagefind from 'astro-pagefind'
import { defineConfig } from 'astro/config'
import 'dotenv/config'
// eslint-disable-next-line import/no-extraneous-dependencies
import { visualizer } from 'rollup-plugin-visualizer'
import Icons from 'unplugin-icons/vite'

import { satteriContentLinks } from './satteri-links.js'

const isVitest = Boolean(process.env.VITEST)

// https://astro.build/config
export default defineConfig({
  site: 'https://shellwen.com',
  output: isVitest ? 'static' : 'server',
  adapter: isVitest
    ? undefined
    : cloudflare({
        imageService: 'compile',
        platformProxy: {
          configPath: 'wrangler.toml',
        },
        prerenderEnvironment: 'node', // FIXME: https://github.com/withastro/astro/issues/15923
      }),
  integrations: [
    mdx(), // https://github.com/getsentry/sentry-javascript/issues/9777
    ...(() => {
      if (process.env.SENTRY_ENVIRONMENT === 'local-dev') {
        return []
      }
      return [
        sentry({
          dsn: 'https://7df36d7c0ed618e59ae41c6ded5b9a7c@o4506401530511360.ingest.sentry.io/4506401532018688',
          release: `shellwens-things@${process.env.npm_package_version ?? 'unknown'}`,
          sourceMapsUploadOptions: {
            project: 'shellwens-things',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        }),
      ]
    })(),
    sitemap(),
    svelte(),
    pagefind(),
  ],
  markdown: {
    processor: satteri({
      hastPlugins: [satteriContentLinks],
    }),
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
  },
  experimental: {
    contentIntellisense: true,
  },
  image: {
    responsiveImages: true,
    layout: 'constrained',
  },
  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: 'astro',
      }),
      visualizer({
        template: 'sunburst',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
})
