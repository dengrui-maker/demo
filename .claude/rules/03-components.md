# 组件架构规范

## 文件组织

```
src/
├── components/          # 可复用组件
│   ├── ui/              # 基础 UI 原子组件（Button, Input, Modal...）
│   └── shared/          # 跨功能共享组件
├── features/            # 按功能模块组织
│   └── [feature]/
│       ├── components/  # 功能内部组件
│       ├── hooks/       # 功能相关 Hooks
│       ├── types.ts     # 类型定义
│       └── index.ts     # 公开导出
├── hooks/               # 全局通用 Hooks
├── lib/                 # 工具函数、常量
├── types/               # 全局类型定义
└── pages/               # 路由页面
```

## 组件命名

- 组件文件使用 PascalCase：`UserCard.tsx`
- Hook 文件使用 camelCase 并以 `use` 开头：`useUserData.ts`
- 工具函数文件使用 camelCase：`formatDate.ts`
- 每个文件只导出一个主要组件（页面/功能组件）

## 组件设计原则

**单一职责**：一个组件只做一件事。若组件超过 200 行，考虑拆分。

**组合优于继承**：使用 `children` 和 Render Props 实现组合：

```typescript
// ✅ 组合模式
function Card({ children, header }: { children: React.ReactNode; header: React.ReactNode }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}
```

**受控组件**：表单元素优先使用受控模式（`value` + `onChange`）。

## 索引文件

每个功能模块必须有 `index.ts` 作为公共 API 边界：

```typescript
// features/user/index.ts
export { UserCard } from './components/UserCard';
export { useUser } from './hooks/useUser';
export type { User } from './types';
// 不导出内部实现细节
```

## Vite 路径别名

使用 `@/` 别名代替相对路径（需在 `vite.config.ts` 和 `tsconfig.json` 中配置）：

```typescript
// ✅ 清晰
import { Button } from '@/components/ui/Button';

// ❌ 难以维护
import { Button } from '../../../components/ui/Button';
```
