<script lang="ts">
  import type { ChangeEventHandler } from 'svelte/elements'
  import { gridListSwitcherState, type GridListSwitcherState } from '@/lib/store/grid-list-switcher'

  const handleChecked: ChangeEventHandler<HTMLInputElement> = (e: Event) => {
    const target = e.target as HTMLInputElement
    $gridListSwitcherState = target.value as GridListSwitcherState
  }
</script>

<div class={`flex flex-col gap-4 ${$gridListSwitcherState === 'grid' ? 'view-grid' : 'view-list'}`}>
  <div class="join self-end">
    <input
      class="join-item btn"
      type="radio"
      name="options"
      aria-label="列表"
      value="list"
      checked={$gridListSwitcherState === 'list'}
      onchange={handleChecked}
    />
    <input
      class="join-item btn"
      type="radio"
      name="options"
      aria-label="网格"
      value="grid"
      checked={$gridListSwitcherState === 'grid'}
      onchange={handleChecked}
    />
  </div>
  <slot />
</div>
