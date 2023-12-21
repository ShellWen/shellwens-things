import type { CollectionEntry } from 'astro:content'

type CategoriesCollectionType = CollectionEntry<'category'>

export default function sortCategories(categories: CategoriesCollectionType[]) {
  return categories.sort((a, b) => {
    if (a.data.sortOrder < b.data.sortOrder) {
      return -1
    }
    if (a.data.sortOrder > b.data.sortOrder) {
      return 1
    }
    return 0
  })
}
