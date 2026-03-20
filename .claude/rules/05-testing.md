# 测试规范

## 技术栈

- **Vitest** - 单元测试 / 集成测试（与 Vite 原生集成，比 Jest 快）
- **React Testing Library** - 组件测试
- **Playwright** - E2E 测试
- **MSW (Mock Service Worker)** - API 模拟

## 测试文件组织

- 单元测试与源文件同级放置：`Button.tsx` → `Button.test.tsx`
- E2E 测试统一放在 `e2e/` 目录

## 编写原则

**AAA 模式（Arrange-Act-Assert）**：

```typescript
describe('UserCard', () => {
  it('点击关注按钮后显示已关注状态', async () => {
    // Arrange
    const user = { id: '1', name: '张三', following: false };
    render(<UserCard user={user} />);

    // Act
    await userEvent.click(screen.getByRole('button', { name: /关注/i }));

    // Assert
    expect(screen.getByRole('button', { name: /已关注/i })).toBeInTheDocument();
  });
});
```

**测试行为，不测实现**：

```typescript
// ✅ 测试用户可见的结果
expect(screen.getByText('提交成功')).toBeInTheDocument();

// ❌ 测试内部实现细节
expect(component.state.submitted).toBe(true);
```

**优先使用无障碍查询**：

```typescript
// ✅ 按角色/标签查询（与用户感知一致）
screen.getByRole('button', { name: /提交/i });
screen.getByLabelText(/邮箱/i);
screen.getByPlaceholderText(/搜索/i);

// ❌ 避免通过 class/id/testId 查询
container.querySelector('.btn-primary');
screen.getByTestId('submit-btn');  // 最后手段才用
```

## 运行规范

- 优先运行单个测试文件：`pnpm vitest run src/components/Button.test.tsx`
- 避免运行全量测试集（影响性能）
- CI 环境运行全量并生成覆盖率报告

## Mock 规范

- API 请求使用 MSW 拦截，不要直接 mock `fetch`/`axios`
- 时间相关测试使用 `vi.useFakeTimers()`
- 每个测试后清理 mock：`afterEach(() => vi.clearAllMocks())`
