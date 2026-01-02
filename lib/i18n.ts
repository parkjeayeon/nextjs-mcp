// widgets용 i18n 유틸리티
// ChatGPT iframe 환경에서는 동적 import가 안되므로 정적 객체 사용

type Messages = {
  [key: string]: string | Messages;
};

export type Locale = "en" | "ko" | "ja";

// 번역 데이터 (messages/*.json의 widgets 섹션과 동기화)
const messages: Record<Locale, Messages> = {
  ko: {
    common: {
      mcpTool: "MCP 도구",
      loading: "로딩 중...",
      error: "오류가 발생했습니다",
    },
    greet: {
      title: "인사하기",
      welcome: "안녕하세요, {name}님!",
      language: "언어",
    },
    calculate: {
      title: "계산기",
      add: "더하기",
      subtract: "빼기",
      multiply: "곱하기",
      divide: "나누기",
      first: "첫 번째",
      second: "두 번째",
      result: "결과",
    },
    time: {
      title: "현재 시간",
      currentTime: "현재 시간",
      toolCallTime: "도구 호출 시점",
      timezone: "타임존",
    },
  },
  en: {
    common: {
      mcpTool: "MCP Tool",
      loading: "Loading...",
      error: "An error occurred",
    },
    greet: {
      title: "Greeting",
      welcome: "Hello, {name}!",
      language: "Language",
    },
    calculate: {
      title: "Calculator",
      add: "Add",
      subtract: "Subtract",
      multiply: "Multiply",
      divide: "Divide",
      first: "First",
      second: "Second",
      result: "Result",
    },
    time: {
      title: "Current Time",
      currentTime: "Current Time",
      toolCallTime: "Tool call time",
      timezone: "Timezone",
    },
  },
  ja: {
    common: {
      mcpTool: "MCPツール",
      loading: "読み込み中...",
      error: "エラーが発生しました",
    },
    greet: {
      title: "挨拶",
      welcome: "こんにちは、{name}さん！",
      language: "言語",
    },
    calculate: {
      title: "計算機",
      add: "足し算",
      subtract: "引き算",
      multiply: "掛け算",
      divide: "割り算",
      first: "1番目",
      second: "2番目",
      result: "結果",
    },
    time: {
      title: "現在時刻",
      currentTime: "現在時刻",
      toolCallTime: "ツール呼び出し時点",
      timezone: "タイムゾーン",
    },
  },
};

// 지원 언어 목록
export const supportedLocales: Locale[] = ["ko", "en", "ja"];
export const fallbackLocale: Locale = "ko";

// 언어 코드 정규화 (ko-KR → ko)
export function normalizeLocale(locale: string | undefined): Locale {
  if (!locale) return fallbackLocale;
  
  const lang = locale.split("-")[0].toLowerCase();
  return supportedLocales.includes(lang as Locale) 
    ? (lang as Locale) 
    : fallbackLocale;
}

// 번역 메시지 가져오기
export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages[fallbackLocale];
}

// 중첩된 키로 번역 가져오기 + 파라미터 치환
export function translate(
  messages: Messages,
  key: string,
  params?: Record<string, string | number>
): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = messages;

  for (const k of keys) {
    result = result?.[k];
  }

  if (typeof result !== "string") {
    return key; // 폴백: 키 자체 반환
  }

  // 파라미터 치환 (예: "Hello {name}" → "Hello World")
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      result = result.replace(`{${paramKey}}`, String(value));
    });
  }

  return result;
}

// Intl.DateTimeFormat용 로케일 맵
export const localeMap: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};

