import type { CollectionEntry } from 'astro:content'

type PostType = CollectionEntry<'post'>
type CategoryType = CollectionEntry<'category'>

export const sortPostByPubDateAsc = (a: PostType, b: PostType): number =>
  a.data.pubDate.valueOf() - b.data.pubDate.valueOf()
export const sortPostByPubDateDesc = (a: PostType, b: PostType): number =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()

export const sortCategoryBySortOrder = (a: CategoryType, b: CategoryType): number => a.data.sortOrder - b.data.sortOrder
