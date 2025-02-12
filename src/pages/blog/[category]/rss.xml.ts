import type { APIRoute } from 'astro'
import { type DataEntryMap, getCollection } from 'astro:content'

import { SITE_DESCRIPTION, SITE_TITLE } from '@/consts'
import { postsRssApi } from '@/lib/rss'

type Category = DataEntryMap['category'][keyof DataEntryMap['category']]

export async function getStaticPaths() {
  const categories = await getCollection('category')
  return categories.map((category) => ({
    params: { category: category.id },
    props: {
      category,
    },
  }))
}

export const GET: APIRoute = async (context) => {
  const { category } = context.props as {
    category: Category
  }
  const route = postsRssApi(
    (post) => post.data.category.id === category.id,
    `${SITE_TITLE} | ${category.data.name}`,
    `${category.data.description} | ${SITE_DESCRIPTION}`,
  )

  return route(context)
}
