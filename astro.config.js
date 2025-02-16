// import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import sentry from '@sentry/astro'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
// eslint-disable-next-line import/no-extraneous-dependencies
import { visualizer } from 'rollup-plugin-visualizer'

// https://astro.build/config
export default defineConfig({
  site: 'https://shellwen.com',
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.toml',
    },
  }),
  integrations: [
    // Sentry does not support Astro with Cloudflare adapter yet
    mdx(), // https://github.com/getsentry/sentry-javascript/issues/9777
    sentry({
      dsn: 'https://7df36d7c0ed618e59ae41c6ded5b9a7c@o4506401530511360.ingest.sentry.io/4506401532018688',
      release: `shellwens-things@${process.env.npm_package_version ?? 'unknown'}`,
      sourceMapsUploadOptions: {
        project: 'shellwens-things',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    sitemap(),
    svelte(),
    icon(),
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
        },
      ],
    ],
  },
  experimental: {
    contentIntellisense: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        template: 'sunburst',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
  },
})
