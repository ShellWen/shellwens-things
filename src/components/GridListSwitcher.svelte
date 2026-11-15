<script lang="ts">
  import { gridListSwitcherState } from '@/lib/store/grid-list-switcher'
</script>

<div class={`post-view ${$gridListSwitcherState === 'grid' ? 'view-grid' : 'view-list'}`}>
  <div class="segmented-control view-controls" role="group" aria-label="文章显示方式">
    <button
      class="button button-quiet"
      type="button"
      aria-label="列表"
      aria-pressed={$gridListSwitcherState === 'list'}
      onclick={() => $gridListSwitcherState = 'list'}
    >列表</button>
    <button
      class="button button-quiet"
      type="button"
      aria-label="网格"
      aria-pressed={$gridListSwitcherState === 'grid'}
      onclick={() => $gridListSwitcherState = 'grid'}
    >网格</button>
  </div>
  <slot />
</div>

<style>
  .post-view {
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    gap: 24px;
  }
  .view-controls {
    align-self: end;
  }
  @media (max-width: 639px) {
    .post-view {
      gap: 16px;
    }
  }
</style>
