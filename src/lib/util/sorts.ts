import type { CollectionEntry } from 'astro:content'

type PostType = CollectionEntry<'post'>
type CategoryType = CollectionEntry<'category'>

const newDateFromString = (dateStr: string): Date => new Date(dateStr + 'T00:00:00Z')

export const sortPostByPubDateAsc = (a: PostType, b: PostType): number =>
  newDateFromString(a.data.pubDate).valueOf() - newDateFromString(b.data.pubDate).valueOf()
export const sortPostByPubDateDesc = (a: PostType, b: PostType): number =>
  newDateFromString(b.data.pubDate).valueOf() - newDateFromString(a.data.pubDate).valueOf()

export const sortCategoryBySortOrder = (a: CategoryType, b: CategoryType): number => a.data.sortOrder - b.data.sortOrder
