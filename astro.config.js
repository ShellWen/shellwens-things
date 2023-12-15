import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://shellwen.com',
  output: 'hybrid',
  integrations: [mdx(), react(), sitemap(), tailwind()],
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
})
