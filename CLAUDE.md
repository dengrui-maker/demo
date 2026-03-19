# Bash 命令
- pnpm run build: 构建项目
- pnpm run tslint: 类型检查
- pnpm run mcp:build: 构建 MCP 服务
- pnpm run mcp:start: 启动 MCP 服务

# 代码风格
- 使用 TypeScript 和 ES6+ 规范书写代码
- 尽可能使用解构导入，例如：import { foo } from 'bar'
- 给方法或函数加上文档注释
- 

# 工作流程
- 在完成一系列代码更改后务必进行类型检查
- 为了性能考虑，优先运行单个测试，而不是整个测试集