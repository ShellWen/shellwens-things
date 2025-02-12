// import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
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
    mdx(),
    react(),
    sitemap(),
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
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
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
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        template: 'sunburst',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      // TODO: Wordaround: https://github.com/withastro/astro/issues/12824#issuecomment-2563095382
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },
})
