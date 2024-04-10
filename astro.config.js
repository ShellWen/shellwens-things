// import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
  site: 'https://shellwen.com',
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
  markdown: {
    syntaxHighlight: 'shiki',
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'prepend' }]],
  },
})
