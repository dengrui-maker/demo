# React 19 规范

## 组件定义

- 使用函数组件，禁止类组件
- 禁止使用 `React.FC` 类型（已废弃），直接声明 Props 接口：

```typescript
// ✅ 正确
interface Props {
  readonly name: string;
  readonly onClick: () => void;
}
function Button({ name, onClick }: Props) { ... }

// ❌ 禁止
const Button: React.FC<Props> = ({ name }) => { ... }
```

- 禁止使用 `forwardRef`（React 19 直接将 `ref` 作为普通 prop 传递）：

```typescript
// ✅ React 19 正确方式
interface Props {
  readonly ref?: React.Ref<HTMLDivElement>;
}
function Card({ ref, ...props }: Props) {
  return <div ref={ref} {...props} />;
}
```

## Hooks 使用规范

- 使用 React 19 新 Hooks：
  - `useActionState` 处理表单提交和异步操作
  - `useOptimistic` 实现乐观更新
  - `use()` 读取 Promise 或 Context

```typescript
// ✅ useActionState 表单处理
const [state, formAction, isPending] = useActionState(
  async (prevState: FormState, formData: FormData) => {
    const result = await submitForm(formData);
    return result;
  },
  null
);

// ✅ useOptimistic 乐观更新
const [optimisticList, addOptimistic] = useOptimistic(
  serverList,
  (state, newItem) => [...state, { ...newItem, pending: true }]
);
```

- 禁止在条件语句、循环中调用 Hooks
- `useEffect` 必须处理清理函数（有副作用时）

## Props 传递

- 禁止使用 `defaultProps`（已废弃），使用参数默认值：

```typescript
// ✅ 正确
function Button({ variant = 'primary', size = 'md' }: Props) { ... }

// ❌ 禁止
Button.defaultProps = { variant: 'primary' };
```

- 避免 Props 透传超过 2 层，考虑 Context 或组合模式

## 事件处理

- 事件处理函数命名以 `handle` 开头（内部）或 `on` 开头（Props）：

```typescript
// Props 中
interface Props { onSubmit: (data: FormData) => void; }

// 内部处理
function handleSubmit(e: React.FormEvent) { ... }
```
