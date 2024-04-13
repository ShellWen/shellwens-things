import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '../consts'

// eslint-disable-next-line import/prefer-default-export
export const GET: APIRoute = async function GET(context) {
  if (!context.site) throw new Error('Missing site metadata')

  const posts = await getCollection('post')
  const items = [
    ...posts.map((post) => {
      const category = post.data.category.id
      return {
        ...post.data,
        link: `/blog/${category}/${post.slug}/`,
      }
    }),
  ]
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
    stylesheet: '/rss/pretty-feed-v3.xsl',
  })
}
