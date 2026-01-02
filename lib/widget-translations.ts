// widgets용 번역 유틸리티
// next-intl과 동일한 JSON 파일을 공유합니다

import koMessages from "@/messages/ko.json";
import enMessages from "@/messages/en.json";
import jaMessages from "@/messages/ja.json";

export type WidgetLocale = "ko" | "en" | "ja";

type Messages = typeof koMessages;

const messages: Record<WidgetLocale, Messages | typeof jaMessages> = {
  ko: koMessages,
  en: enMessages,
  ja: jaMessages,
};

// widgets 섹션의 번역을 가져옵니다
export function getWidgetTranslations(locale: WidgetLocale = "ko") {
  const msg = messages[locale] || messages.ko;
  return msg.widgets;
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

