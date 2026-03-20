# TypeScript 规范

## 严格模式要求

- 始终开启 `strict: true`，禁用 `noUnusedLocals`、`noUnusedParameters` 例外
- 禁止使用 `any`，使用 `unknown` + 类型守卫代替
- 禁止类型断言 `as Type`，除非有明确注释说明原因
- 所有函数必须有明确的返回类型注解（推断不清晰时）

## 类型定义

- 优先使用 `interface` 定义对象结构，使用 `type` 定义联合类型/交叉类型
- 组件 Props 使用 `readonly` 修饰所有字段，防止意外修改
- 使用判别联合（Discriminated Union）表示多状态：

```typescript
// ✅ 正确：判别联合状态
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// ❌ 错误：可选字段混用
type AsyncState<T> = {
  loading?: boolean;
  data?: T;
  error?: Error;
};
```

## 导入规范

- 使用解构导入：`import { foo, bar } from 'module'`
- 类型导入使用 `import type`：`import type { Foo } from './types'`
- 禁止默认导出（除路由页面组件外），统一使用命名导出

## 枚举与常量

- 避免 TypeScript `enum`，使用 `as const` 对象代替：

```typescript
// ✅ 正确
const Status = { Idle: 'idle', Loading: 'loading' } as const;
type Status = (typeof Status)[keyof typeof Status];

// ❌ 避免
enum Status { Idle = 'idle', Loading = 'loading' }
```
