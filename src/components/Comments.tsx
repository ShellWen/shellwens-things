import { useMemo } from 'react'

import Giscus from '@giscus/react'

import useTheme from '@/lib/theme/useTheme'

const Comments: React.FC<{
  term: string
}> = ({ term }) => {
  const { theme } = useTheme()
  const themeString = useMemo(() => {
    if (theme.colorMode === 'dark') {
      return 'dark_dimmed'
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (theme.colorMode === 'light') {
      return 'light_tritanopia'
    }
    throw new Error('theme.colorMode must be dark or light')
  }, [theme])

  return (
    <Giscus
      id="comments"
      repo="ShellWen/shellwens-everything-discussion"
      repoId="R_kgDOK52cgw"
      category="评论区"
      categoryId="DIC_kwDOK52cg84Cbvgd"
      mapping="specific"
      term={term}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={themeString}
      lang="zh-CN"
      loading="lazy"
    />
  )
}

export default Comments
