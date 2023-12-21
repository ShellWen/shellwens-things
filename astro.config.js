import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
// import sentry from '@sentry/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://shellwen.com',
  output: 'hybrid',
  integrations: [
    mdx(),
    react(),
    sitemap(),
    tailwind(),
    // Sentry does not support Astro with Cloudflare adapter yet
    // https://github.com/getsentry/sentry-javascript/issues/9777

    // sentry({
    //   dsn: 'https://7df36d7c0ed618e59ae41c6ded5b9a7c@o4506401530511360.ingest.sentry.io/4506401532018688',
    //   release: `shellwens-things@${process.env.npm_package_version ?? 'unknown'}`,
    // sourceMapsUploadOptions: {
    //   project: 'shellwens-things',
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    // },
    // }),
  ],
  adapter: cloudflare({
    // Cloudflare's image service need to pay for extra
    // imageService: 'cloudflare',
    imageService: 'passthrough',
  }),
})
