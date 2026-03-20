# 样式规范

## 当前项目（CSS Modules / 原生 CSS）

- 组件样式文件与组件同名：`Button.tsx` → `Button.module.css`
- 使用 CSS 自定义属性（变量）管理设计 token：

```css
/* index.css */
:root {
  --color-primary: #3b82f6;
  --color-text: #1f2937;
  --spacing-sm: 0.5rem;
  --radius-md: 0.375rem;
}
```

## 命名规范

- CSS Modules 类名使用 camelCase：`.buttonPrimary`、`.cardHeader`
- 普通 CSS 类名使用 kebab-case：`.button-primary`

## 响应式设计

- 移动优先（Mobile First），使用 `min-width` 媒体查询
- 断点变量化，不要硬编码像素值

```css
/* ✅ 使用变量 */
@media (min-width: var(--breakpoint-md)) { ... }
```

## 禁止内联样式

除动态计算值外，禁止使用内联 `style` 属性：

```tsx
// ❌ 避免
<div style={{ color: 'red', padding: '16px' }}>

// ✅ 动态值可以接受
<div style={{ '--progress': `${percent}%` } as React.CSSProperties}>
```

## 动画与过渡

- 尊重用户减少动画偏好：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 若引入 Tailwind CSS

- 使用 `cn()` 工具函数合并类名（避免条件拼接字符串）：

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- 复杂组件使用 `cva`（class-variance-authority）管理变体，不要用三元表达式堆叠类名
