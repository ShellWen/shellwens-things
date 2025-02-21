import { toString } from 'mdast-util-to-string'
import { readingTime } from 'reading-time-estimator'

/** @import { RemarkPlugin } from '@astrojs/markdown-remark' */
/** @type {RemarkPlugin} */
export const remarkReadingTime = () => {
  return (tree, { data }) => {
    const textOnPage = toString(tree)
    const t = readingTime(textOnPage, 300, 'cn')
    data.astro.frontmatter.minutesRead = '预计 ' + t.text
  }
}
