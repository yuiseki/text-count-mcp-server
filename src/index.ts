#!/user/bin/env node

/**
 * This is a MCP server that provides text counting tools.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { detect } from "tinyld";

const server = new Server(
  {
    name: "text-count-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "count_characters",
        description:
          "Count the number of characters in the text extremely accurately. You are not good at counting characters, so if you need to count characters, you should use this tool.",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to count characters in.",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "count_words",
        description:
          "Count the number of words in the text extremely accurately. You are not good at counting words, so if you need to count words, you should use this tool.",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "The text to count words in.",
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "count_characters": {
      if (
        !request.params.arguments ||
        typeof request.params.arguments.text !== "string"
      ) {
        throw new Error(
          "Invalid arguments: 'text' is required and must be a string."
        );
      }

      const text = request.params.arguments.text;
      const characterCount = text.length;
      return {
        content: [
          {
            type: "text",
            text: `The text contains ${characterCount} characters.`,
          },
        ],
      };
    }
    case "count_words": {
      if (
        !request.params.arguments ||
        typeof request.params.arguments.text !== "string"
      ) {
        throw new Error(
          "Invalid arguments: 'text' is required and must be a string."
        );
      }

      const text = request.params.arguments.text;
      let lang = "en";
      let wordCount = 0;
      lang = detect(text);
      switch (lang) {
        case "en":
          wordCount = text.trim().split(/\s+/).length;
          break;
        case "ja":
          throw new Error("Japanese is not supported yet.");
          break;
        default:
          wordCount = text.trim().split(/\s+/).length;
          break;
      }

      return {
        content: [
          {
            type: "text",
            text: `The text contains ${wordCount} words.`,
          },
        ],
      };
    }
    default:
      throw new Error(`Unknown tool: ${request.params.name}`);
  }
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
