import { persistentAtom } from '@nanostores/persistent'

export type GridListSwitcherState = 'grid' | 'list'

export const gridListSwitcherState = persistentAtom<GridListSwitcherState>('gridListSwitcher', 'list')
