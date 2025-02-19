/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MenuData, MenuProps } from '../types'
import type { ComputedRef, Slots, VNode } from 'vue'

import { computed } from 'vue'

import { Logger, VKey, flattenNode } from '@idux/cdk/utils'

import { dividerKey, itemGroupKey, itemKey, subKey } from '../menus'

export function useDataSource(props: MenuProps, slots: Slots): ComputedRef<MenuData[]> {
  return computed(() => {
    const { dataSource } = props
    if (dataSource) {
      return dataSource
    } else {
      return convertDataSource(slots.default?.())
    }
  })
}

const filterKeys = [itemKey, itemGroupKey, subKey, dividerKey]

function convertDataSource(nodes: VNode[] | undefined): MenuData[] {
  const dataSource: Array<MenuData> = []

  flattenNode(nodes, { key: filterKeys }).forEach(node => {
    const { type, children: slots, props } = node as VNode & { children: any; props: { key: VKey } }
    let data: MenuData
    if ((type as any)[itemKey]) {
      const { key, disabled, icon, label, ...additional } = props || {}
      data = {
        type: 'item',
        key,
        disabled: disabled || disabled === '',
        icon,
        label,
        additional,
        slots,
      }
    } else if ((type as any)[itemGroupKey]) {
      const { key, children, icon, label, ...additional } = props || {}
      const _children = children ?? convertDataSource(slots.default?.())
      data = {
        type: 'itemGroup',
        key,
        children: _children,
        icon,
        label,
        additional,
        slots,
      }
    } else if ((type as any)[subKey]) {
      const { key, children, disabled, icon, label, suffix, ...additional } = props || {}
      const _children = children ?? convertDataSource(slots.default?.())
      data = {
        type: 'sub',
        key,
        children: _children,
        disabled: disabled || disabled === '',
        icon,
        label,
        additional,
        slots,
      }
    } else {
      const { key, ...additional } = props || {}
      data = { type: 'divider', key, additional }
    }
    if (__DEV__ && data.type !== 'divider' && !data.key) {
      Logger.warn('components/menu', 'key must exist', data, slots.default())
    }
    dataSource.push(data)
  })

  return dataSource
}
