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
    ;(document.getElementById('site-search-modal') as HTMLDialogElement)?.showModal()
  }
</script>

<div class="flex items-center">
  <button
    class="tooltip btn btn-ghost btn-sm tooltip-bottom"
    type="button"
    aria-label="搜索"
    data-tip="搜索"
    onclick={openSearch}
  >
    <IconSearch />
  </button>
  <div class="join" role="group" aria-label="主题选择">
    <button
      class="tooltip join-item btn btn-ghost btn-sm"
      class:btn-active={currentMode === 'system'}
      type="button"
      aria-label="跟随系统"
      aria-pressed={currentMode === 'system'}
      data-tip="跟随系统"
      onclick={() => setMode('system')}
    >
      <IconBrightnessAuto />
    </button>
    <button
      class="tooltip join-item btn btn-ghost btn-sm"
      class:btn-active={currentMode === 'light'}
      type="button"
      aria-label="浅色"
      aria-pressed={currentMode === 'light'}
      data-tip="浅色"
      onclick={() => setMode('light')}
    >
      <IconLightMode />
    </button>
    <button
      class="tooltip join-item btn btn-ghost btn-sm"
      class:btn-active={currentMode === 'dark'}
      type="button"
      aria-label="深色"
      aria-pressed={currentMode === 'dark'}
      data-tip="深色"
      onclick={() => setMode('dark')}
    >
      <IconDarkMode />
    </button>
  </div>
</div>
