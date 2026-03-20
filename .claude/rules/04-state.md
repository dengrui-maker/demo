# 状态管理规范

## 状态分层原则

| 层级 | 类型 | 适用工具 | 示例 |
|------|------|----------|------|
| 服务端状态 | API 数据、缓存 | TanStack Query | 用户列表、商品详情 |
| 全局客户端状态 | 跨页面共享 UI 状态 | Zustand | 主题、认证信息、通知 |
| 本地 UI 状态 | 组件内部状态 | `useState`/`useReducer` | 模态框开关、输入值 |
| 派生状态 | 由其他状态计算得出 | `useMemo`/选择器 | 过滤后列表、合计金额 |

**核心原则：优先使用本地状态，只有真正需要共享时才提升到全局。**

## React 内置状态

- 简单值使用 `useState`
- 复杂对象/多个关联状态使用 `useReducer`
- 避免在 `useEffect` 中同步状态（尽量通过事件驱动）

```typescript
// ✅ useReducer 管理复杂状态
type Action =
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILTER': return { ...state, filter: action.payload, page: 1 };
    case 'SET_PAGE': return { ...state, page: action.payload };
    case 'RESET': return initialState;
  }
}
```

## Context 使用规范

- Context 仅用于低频更新的数据（主题、语言、认证）
- 高频更新数据不要放入 Context（会导致全树重渲染）
- 将 Context 的 Provider 和 Hook 封装在同一文件：

```typescript
// ✅ 封装 Context
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = use(ThemeContext);  // React 19: use() 代替 useContext()
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

## 服务端状态（TanStack Query）

若项目引入 TanStack Query：

- 禁止将服务端数据同步到 Zustand/Context
- 使用 `queryKey` 工厂函数保持键一致性：

```typescript
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
};
```

## Zustand 规范（如使用）

- 使用选择器避免不必要的重渲染：

```typescript
// ✅ 细粒度订阅
const count = useStore((state) => state.count);

// ❌ 订阅整个 store
const store = useStore();
```

- Store 按功能域拆分，不要创建单一巨型 Store
