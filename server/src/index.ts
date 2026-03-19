import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

/**
 * 加法 MCP 服务
 * 提供两个数字相加的功能
 */
const server = new Server(
  {
    name: "addition-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * 注册工具列表处理器
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add",
        description: "将两个数字相加",
        inputSchema: {
          type: "object",
          properties: {
            a: {
              type: "number",
              description: "第一个数字",
            },
            b: {
              type: "number",
              description: "第二个数字",
            },
          },
          required: ["a", "b"],
        },
      },
    ],
  };
});

/**
 * 注册工具调用处理器
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "add") {
    const { a, b } = args as { a: number; b: number };

    if (typeof a !== "number" || typeof b !== "number") {
      return {
        content: [
          {
            type: "text",
            text: "错误：参数必须是数字",
          },
        ],
        isError: true,
      };
    }

    const result = a + b;
    return {
      content: [
        {
          type: "text",
          text: `${a} + ${b} = ${result}`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text",
        text: `未知工具: ${name}`,
      },
    ],
    isError: true,
  };
});

/**
 * 启动服务器
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("加法 MCP 服务已启动");
}

main().catch(console.error);
