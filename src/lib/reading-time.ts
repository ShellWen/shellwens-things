import { readingTime } from 'reading-time-estimator'
import { zhCn } from 'reading-time-estimator/i18n/zh-cn'

export const getReadingTime = (source?: string) => {
  const result = readingTime(source ?? '', {
    wordsPerMinute: 300,
    language: 'zh-cn',
    translations: {
      'zh-cn': zhCn,
    },
  })
  return `预计 ${result.text}`
}
