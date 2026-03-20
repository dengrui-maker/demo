# 技术栈

React 19 + TypeScript 5 + Vite 6

# Bash 命令

- `pnpm run dev`: 启动开发服务器
- `pnpm run build`: 构建项目
- `pnpm run lint`: ESLint + TypeScript 类型检查
- `pnpm run mcp:build`: 构建 MCP 服务
- `pnpm run mcp:start`: 启动 MCP 服务

# 核心规范

详细规则见 `.claude/rules/` 目录：

| 文件 | 内容 |
|------|------|
| [01-typescript.md](rules/01-typescript.md) | TypeScript 严格模式、类型定义、导入规范 |
| [02-react.md](rules/02-react.md) | React 19 组件模式、Hooks、事件处理 |
| [03-components.md](rules/03-components.md) | 文件组织、命名规范、组合模式 |
| [04-state.md](rules/04-state.md) | 状态分层、Context、TanStack Query |
| [05-testing.md](rules/05-testing.md) | Vitest、React Testing Library、测试原则 |
| [06-styling.md](rules/06-styling.md) | CSS Modules、响应式、动画 |
| [07-a11y.md](rules/07-a11y.md) | WCAG 2.2、语义化 HTML、键盘导航 |
| [08-performance.md](rules/08-performance.md) | 渲染优化、代码分割、构建配置 |

# 工作流程

- 完成代码更改后必须运行 `pnpm run lint` 进行类型检查
- 优先运行单个测试文件，而非整个测试集
- 禁止使用 `any` 类型，禁止 `React.FC`，禁止 `forwardRef`