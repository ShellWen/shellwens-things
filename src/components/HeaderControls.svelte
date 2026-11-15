<script lang="ts">
  import { useSystemTheme, localStorageTheme, themes } from '@/lib/store/theme'
  import IconBrightnessAuto from '~icons/material-symbols/brightness-auto'
  import IconLightMode from '~icons/material-symbols/light-mode'
  import IconDarkMode from '~icons/material-symbols/dark-mode'
  import IconSearch from '~icons/material-symbols/search'

  type Mode = 'system' | 'light' | 'dark'

  let currentMode: Mode = $state('system')

  $effect(() => {
    const useSystem = JSON.parse($useSystemTheme) as boolean
    if (useSystem) {
      currentMode = 'system'
    } else {
      currentMode = $localStorageTheme === themes.shellwenDark.name ? 'dark' : 'light'
    }
  })

  function setMode(mode: Mode) {
    currentMode = mode
    if (mode === 'system') {
      useSystemTheme.set(JSON.stringify(true))
    } else {
      useSystemTheme.set(JSON.stringify(false))
      localStorageTheme.set(mode === 'dark' ? themes.shellwenDark.name : themes.shellwenLight.name)
    }
  }

  function openSearch() {
    document.dispatchEvent(new CustomEvent('site-search-open'))
  }
</script>

<div class="header-tools">
  <button
    class="icon-button"
    type="button"
    aria-label="搜索"
    aria-haspopup="dialog"
    aria-controls="site-search-modal"
    aria-keyshortcuts="Control+k Meta+k"
    title="搜索（Ctrl / ⌘ K）"
    onclick={openSearch}
  >
    <IconSearch aria-hidden="true" />
  </button>
  <div class="segmented-control" role="group" aria-label="主题选择">
    <button
      class="icon-button"
      type="button"
      aria-label="跟随系统"
      aria-pressed={currentMode === 'system'}
      title="跟随系统"
      onclick={() => setMode('system')}
    >
      <IconBrightnessAuto aria-hidden="true" />
    </button>
    <button
      class="icon-button"
      type="button"
      aria-label="浅色"
      aria-pressed={currentMode === 'light'}
      title="浅色"
      onclick={() => setMode('light')}
    >
      <IconLightMode aria-hidden="true" />
    </button>
    <button
      class="icon-button"
      type="button"
      aria-label="深色"
      aria-pressed={currentMode === 'dark'}
      title="深色"
      onclick={() => setMode('dark')}
    >
      <IconDarkMode aria-hidden="true" />
    </button>
  </div>
</div>

<style>
  @reference '../styles/global.css';

  .header-tools { display: flex; align-items: center; gap: 4px; }
  .header-tools :global(svg) { width: 20px; height: 20px; }

  @media (max-width: 639px) {
    .segmented-control { gap: 0; padding: 0; background: transparent; }
    .segmented-control .icon-button { border: 6px solid transparent; background-clip: padding-box; }
    .segmented-control :global(svg) { width: 16px; height: 16px; }
  }
</style>
