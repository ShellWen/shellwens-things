import { toString } from 'mdast-util-to-string'
import { readingTime } from 'reading-time-estimator'
import { zhCn } from 'reading-time-estimator/i18n/zh-cn'

/** @import { RemarkPlugin } from '@astrojs/markdown-remark' */
/** @type {RemarkPlugin} */
export const remarkReadingTime = () => {
  return (tree, { data }) => {
    const textOnPage = toString(tree)
    const t = readingTime(textOnPage, {
      wordsPerMinute: 300,
      language: 'zh-cn',
      translations: {
        'zh-cn': zhCn,
      },
    })
    data.astro.frontmatter.minutesRead = '预计 ' + t.text
  }
}
