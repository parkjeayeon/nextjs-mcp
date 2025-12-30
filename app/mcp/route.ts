import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
  widgetDomain: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const handler = createMcpHandler(async (server) => {
  // 각 위젯별 HTML 가져오기
  const [homeHtml, greetHtml, calculateHtml, timeHtml] = await Promise.all([
    getAppsSdkCompatibleHtml(baseURL, "/"),
    getAppsSdkCompatibleHtml(baseURL, "/widgets/greet"),
    getAppsSdkCompatibleHtml(baseURL, "/widgets/calculate"),
    getAppsSdkCompatibleHtml(baseURL, "/widgets/time"),
  ]);

  const contentWidget: ContentWidget = {
    id: "show_content",
    title: "Show Content",
    templateUri: "ui://widget/content-template.html",
    invoking: "Loading content...",
    invoked: "Content loaded",
    html: homeHtml,
    description: "Displays the homepage content",
    widgetDomain: "https://nextjs.org/docs",
  };
  server.registerResource(
    "content-widget",
    contentWidget.templateUri,
    {
      title: contentWidget.title,
      description: contentWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": contentWidget.description,
        "openai/widgetPrefersBorder": true,
        "openai/widgetCSP": {
          connect_domains: [],
          resource_domains: [],
        },
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html lang="en">${contentWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": contentWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": contentWidget.widgetDomain,
            "openai/widgetCSP": {
              connect_domains: [],
              resource_domains: [],
            },
          },
        },
      ],
    })
  );

  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description:
        "Fetch and display the homepage content with the name of the user",
      inputSchema: {
        name: z.string().describe("The name of the user to display on the homepage"),
      },
      _meta: widgetMeta(contentWidget),
    },
    async ({ name }) => {
      return {
        content: [
          {
            type: "text",
            text: name,
          },
        ],
        structuredContent: {
          name: name,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(contentWidget),
      };
    }
  );

  // 🎉 greet 도구 - 사용자에게 인사
  const greetWidget: ContentWidget = {
    id: "greet",
    title: "인사하기",
    templateUri: "ui://widget/greet-template.html",
    invoking: "인사 준비 중...",
    invoked: "인사 완료!",
    html: greetHtml,
    description: "사용자에게 인사를 합니다",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "greet-widget",
    greetWidget.templateUri,
    {
      title: greetWidget.title,
      description: greetWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": greetWidget.description,
        "openai/widgetPrefersBorder": true,
        "openai/widgetCSP": {
          connect_domains: [],
          resource_domains: [],
        },
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html lang="en">${greetWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": greetWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": greetWidget.widgetDomain,
            "openai/widgetCSP": {
              connect_domains: [],
              resource_domains: [],
            },
          },
        },
      ],
    })
  );

  server.registerTool(
    greetWidget.id,
    {
      title: greetWidget.title,
      description: "사용자에게 인사를 합니다",
      inputSchema: {
        name: z.string().describe("인사할 사람의 이름"),
        language: z
          .enum(["ko", "en", "ja"])
          .default("ko")
          .describe("인사 언어 (ko: 한국어, en: 영어, ja: 일본어)"),
      },
      _meta: widgetMeta(greetWidget),
    },
    async ({ name, language = "ko" }) => {
      const greetings = {
        ko: `안녕하세요, ${name}님! 만나서 반갑습니다! 🎉`,
        en: `Hello, ${name}! Nice to meet you! 🎉`,
        ja: `こんにちは、${name}さん！はじめまして！🎉`,
      };

      const greeting = greetings[language as keyof typeof greetings];

      return {
        content: [{ type: "text" as const, text: greeting }],
        structuredContent: {
          toolType: "greet",
          name,
          language,
          greeting,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(greetWidget),
      };
    }
  );

  // 🧮 calculate 도구 - 간단한 수학 계산
  const calculateWidget: ContentWidget = {
    id: "calculate",
    title: "계산기",
    templateUri: "ui://widget/calculate-template.html",
    invoking: "계산 중...",
    invoked: "계산 완료!",
    html: calculateHtml,
    description: "간단한 수학 계산을 수행합니다",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "calculate-widget",
    calculateWidget.templateUri,
    {
      title: calculateWidget.title,
      description: calculateWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": calculateWidget.description,
        "openai/widgetPrefersBorder": true,
        "openai/widgetCSP": {
          connect_domains: [],
          resource_domains: [],
        },
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html lang="en">${calculateWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": calculateWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": calculateWidget.widgetDomain,
            "openai/widgetCSP": {
              connect_domains: [],
              resource_domains: [],
            },
          },
        },
      ],
    })
  );

  server.registerTool(
    calculateWidget.id,
    {
      title: calculateWidget.title,
      description: "간단한 수학 계산을 수행합니다",
      inputSchema: {
        operation: z
          .enum(["add", "subtract", "multiply", "divide"])
          .describe("연산 종류"),
        a: z.number().describe("첫 번째 숫자"),
        b: z.number().describe("두 번째 숫자"),
      },
      _meta: widgetMeta(calculateWidget),
    },
    async ({ operation, a, b }) => {
      let result: number;
      let symbol: string;
      let isError = false;
      let errorMessage = "";

      switch (operation) {
        case "add":
          result = a + b;
          symbol = "+";
          break;
        case "subtract":
          result = a - b;
          symbol = "-";
          break;
        case "multiply":
          result = a * b;
          symbol = "×";
          break;
        case "divide":
          if (b === 0) {
            isError = true;
            errorMessage = "❌ 오류: 0으로 나눌 수 없습니다!";
            result = 0;
            symbol = "÷";
          } else {
            result = a / b;
            symbol = "÷";
          }
          break;
        default:
          result = 0;
          symbol = "?";
      }

      if (isError) {
        return {
          content: [{ type: "text" as const, text: errorMessage }],
          isError: true,
        };
      }

      const text = `🧮 계산 결과: ${a} ${symbol} ${b} = ${result}`;

      return {
        content: [{ type: "text" as const, text }],
        structuredContent: {
          toolType: "calculate",
          operation,
          a,
          b,
          symbol,
          result,
          expression: `${a} ${symbol} ${b}`,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(calculateWidget),
      };
    }
  );

  // 🕐 get_time 도구 - 현재 시간 반환
  const timeWidget: ContentWidget = {
    id: "get_time",
    title: "현재 시간",
    templateUri: "ui://widget/time-template.html",
    invoking: "시간 확인 중...",
    invoked: "시간 확인 완료!",
    html: timeHtml,
    description: "현재 시간을 반환합니다",
    widgetDomain: baseURL,
  };

  server.registerResource(
    "time-widget",
    timeWidget.templateUri,
    {
      title: timeWidget.title,
      description: timeWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": timeWidget.description,
        "openai/widgetPrefersBorder": true,
        "openai/widgetCSP": {
          connect_domains: [],
          resource_domains: [],
        },
      },
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html lang="en">${timeWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": timeWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": timeWidget.widgetDomain,
            "openai/widgetCSP": {
              connect_domains: [],
              resource_domains: [],
            },
          },
        },
      ],
    })
  );

  server.registerTool(
    timeWidget.id,
    {
      title: timeWidget.title,
      description: "현재 시간을 반환합니다",
      inputSchema: {
        timezone: z.string().default("Asia/Seoul").describe("타임존"),
      },
      _meta: widgetMeta(timeWidget),
    },
    async ({ timezone = "Asia/Seoul" }) => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("ko-KR", {
          timeZone: timezone,
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        const formattedTime = formatter.format(now);
        const text = `🕐 현재 시간 (${timezone}): ${formattedTime}`;

        return {
          content: [{ type: "text" as const, text }],
          structuredContent: {
            toolType: "get_time",
            timezone,
            formattedTime,
            isoTime: now.toISOString(),
            timestamp: now.getTime(),
          },
          _meta: widgetMeta(timeWidget),
        };
      } catch {
        return {
          content: [
            {
              type: "text" as const,
              text: `❌ 오류: 잘못된 타임존입니다 - ${timezone}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
});

export const GET = handler;
export const POST = handler;
