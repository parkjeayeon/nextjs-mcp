// widgets용 번역 유틸리티
// JSON 파일과 동일한 구조를 유지하여 동기화 가능

export type WidgetLocale = "ko" | "en" | "ja";

// widgets 번역 데이터 (messages/*.json의 widgets 섹션과 동기화)
const widgetMessages = {
  ko: {
    mcpTool: "MCP 도구",
    greet: {},
    calculate: {
      add: "더하기",
      subtract: "빼기",
      multiply: "곱하기",
      divide: "나누기",
      first: "첫 번째",
      second: "두 번째",
    },
    time: {
      currentTime: "현재 시간",
      toolCallTime: "도구 호출 시점",
    },
  },
  en: {
    mcpTool: "MCP Tool",
    greet: {},
    calculate: {
      add: "Add",
      subtract: "Subtract",
      multiply: "Multiply",
      divide: "Divide",
      first: "First",
      second: "Second",
    },
    time: {
      currentTime: "Current Time",
      toolCallTime: "Tool call time",
    },
  },
  ja: {
    mcpTool: "MCPツール",
    greet: {},
    calculate: {
      add: "足し算",
      subtract: "引き算",
      multiply: "掛け算",
      divide: "割り算",
      first: "1番目",
      second: "2番目",
    },
    time: {
      currentTime: "現在時刻",
      toolCallTime: "ツール呼び出し時点",
    },
  },
};

// widgets 섹션의 번역을 가져옵니다
export function getWidgetTranslations(locale: WidgetLocale = "ko") {
  return widgetMessages[locale] || widgetMessages.ko;
}

// 특정 키의 번역을 가져옵니다 (fallback 지원)
export function t(
  locale: WidgetLocale,
  key: string,
  fallback?: string
): string {
  const widgets = getWidgetTranslations(locale);
  const keys = key.split(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = widgets;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // fallback to Korean if not found
      const koWidgets = getWidgetTranslations("ko");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let koValue: any = koWidgets;
      for (const kk of keys) {
        if (koValue && typeof koValue === "object" && kk in koValue) {
          koValue = koValue[kk];
        } else {
          return fallback || key;
        }
      }
      return typeof koValue === "string" ? koValue : fallback || key;
    }
  }

  return typeof value === "string" ? value : fallback || key;
}

// Intl.DateTimeFormat용 로케일 맵
export const localeMap: Record<WidgetLocale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};
