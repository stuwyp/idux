/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Key, TableProps } from '../types'
import type { TableColumnMerged, TableColumnMergedExpandable } from './useColumns'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

import { callEmit, useControlledProp } from '@idux/cdk/utils'

export function useExpandable(props: TableProps, flattedColumns: ComputedRef<TableColumnMerged[]>): ExpandableContext {
  const expandable = computed(() =>
    flattedColumns.value.find(column => 'type' in column && column.type === 'expandable'),
  ) as ComputedRef<TableColumnMergedExpandable | undefined>

  const [expandedRowKeys, setExpandedRowKeys] = useControlledProp(props, 'expandedRowKeys', () => [])

  const handleExpandChange = (key: Key, record: unknown) => {
    const { onChange, onExpand } = expandable.value || {}
    const tempKeys = [...expandedRowKeys.value]
    const index = tempKeys.indexOf(key)
    const expanded = index >= 0
    if (expanded) {
      tempKeys.splice(index, 1)
    } else {
      tempKeys.push(key)
    }
    callEmit(onExpand, !expanded, record)
    setExpandedRowKeys(tempKeys)
    callEmit(onChange, tempKeys)
  }

  return { expandable, expandedRowKeys, handleExpandChange }
}

export interface ExpandableContext {
  expandable: ComputedRef<TableColumnMergedExpandable | undefined>
  expandedRowKeys: ComputedRef<Key[]>
  handleExpandChange: (key: Key, record: unknown) => void
}
