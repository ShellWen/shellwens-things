<script lang="ts">
  import Giscus from '@giscus/svelte'
  import { theme } from '@/lib/store/theme'

  const {
    term,
  }: {
    term: string
  } = $props()

  const themeString = $derived.by(() => {
    if ($theme.colorMode === 'dark') {
      return 'dark_dimmed'
    }
    if ($theme.colorMode === 'light') {
      return 'light_tritanopia'
    }
    throw new Error('theme.colorMode must be dark or light')
  })
</script>

<Giscus
  id="comments"
  repo="ShellWen/shellwens-everything-discussion"
  repoId="R_kgDOK52cgw"
  category="评论区"
  categoryId="DIC_kwDOK52cg84Cbvgd"
  mapping="specific"
  {term}
  strict="1"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={themeString}
  lang="zh-CN"
  loading="eager"
/>
