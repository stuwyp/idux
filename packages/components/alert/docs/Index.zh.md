---
category: components
type: 反馈
title: Alert
subtitle: 警告提示
cover: 
---

## API

### IxAlert

#### Props

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `closable` | 信息提示是否可关闭 | `boolean` | `false` | ✅ |- |
| `closeIcon` | 自定义关闭按钮 | `string \| #closeIcon` | `close` | - | - |
| `description` | 辅助性文字介绍 | `string \| #description` | - | - |- |
| `icon` | 自定义图标 | `string \| #icon` | - | ✅ | 若要隐藏图标则传空串 |
| `pagination` | 是否开启分页切换 | `boolean \| AlertPagination` | `false` | - | - |
| `type` | 设置提示类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` | - |- |
| `title` | 信息提示内容 | `string \| string[] \| #default` | - | - |- |
| `onBeforeClose` | 关闭提示前会触发的回调函数 | `() => boolean \| Promise<boolean>` | - | - | - |
| `onClose` | 关闭提示会触发的回调函数 | `() => void` | - | - | - |

```ts
export interface AlertPagination {
  pageIndex?: number
  onChange?: (pageIndex: number) => void
}
```
