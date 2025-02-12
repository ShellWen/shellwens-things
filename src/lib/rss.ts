import rss, { type RSSFeedItem } from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { type CollectionEntry, getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'

type PostMap = CollectionEntry<'post'>
type FilterFn = (post: PostMap) => boolean

export const postsRssApi: (filter: FilterFn, title: string, description: string) => APIRoute =
  (filter = () => true, title = SITE_TITLE, description = SITE_DESCRIPTION) =>
  async (context) => {
    if (!context.site) throw new Error('Missing site metadata')

    const posts = await getCollection('post')
    const items: RSSFeedItem[] = [
      ...posts.filter(filter).map((post) => {
        const category = post.data.category.id
        return {
          ...post.data,
          link: `/blog/${category}/${post.id}/`,
        }
      }),
    ]
    return rss({
      title,
      description,
      site: context.site,
      items,
      stylesheet: '/rss/pretty-feed-v3.xsl',
    })
  }
