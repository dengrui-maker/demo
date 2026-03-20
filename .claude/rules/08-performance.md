# 性能优化规范

## 渲染优化

**按需使用记忆化，不要过早优化**：

```typescript
// ✅ 有实际开销时使用 useMemo
const sortedList = useMemo(
  () => items.toSorted((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// ❌ 无意义的记忆化（比直接计算更慢）
const doubled = useMemo(() => count * 2, [count]);
```

- `useCallback` 仅用于传递给子组件的函数（防止子组件重渲染）
- 避免在 JSX 中直接定义对象/数组字面量（每次渲染都是新引用）

## 代码分割

使用 `React.lazy` + `Suspense` 对路由页面进行懒加载：

```typescript
const UserPage = lazy(() => import('@/pages/UserPage'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Suspense>
  );
}
```

## 图片优化

- 使用 `loading="lazy"` 延迟加载非首屏图片
- 提供 `width`/`height` 避免布局偏移（CLS）
- 大图使用 WebP/AVIF 格式

```tsx
<img
  src="/hero.webp"
  alt="..."
  width={800}
  height={400}
  loading="lazy"
/>
```

## Vite 构建优化

- 大型依赖配置手动分包（`vite.config.ts`）：

```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        charts: ['recharts'],
      },
    },
  },
},
```

## 列表渲染

- 长列表（> 100 项）使用虚拟化：`@tanstack/react-virtual`
- `key` 使用稳定唯一 ID，禁止使用数组 `index`（除静态列表外）

## 避免常见陷阱

- 禁止在渲染期间产生副作用（网络请求、DOM 操作）
- `useEffect` 依赖数组必须完整（使用 eslint-plugin-react-hooks）
- 避免派生状态的 `useState` + `useEffect` 同步模式，改用直接计算
