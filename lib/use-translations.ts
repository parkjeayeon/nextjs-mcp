"use client";

import { useMemo } from "react";
import { useContext } from "@openai/apps-sdk-ui";
import { getMessages, translate, normalizeLocale, localeMap, type Locale } from "./i18n";

export function useTranslations(namespace?: string) {
  const context = useContext();

  // ChatGPT 컨텍스트에서 언어 추출
  // context?.user?.locale 또는 브라우저 언어 사용
  const locale = useMemo(() => {
    const userLocale = context?.user?.locale;
    if (userLocale) return normalizeLocale(userLocale);
    
    // 브라우저 언어 폴백 (클라이언트에서만)
    if (typeof navigator !== "undefined") {
      return normalizeLocale(navigator.language);
    }
    
    return "ko" as Locale;
  }, [context?.user?.locale]);

  const messages = useMemo(() => getMessages(locale), [locale]);

  // 번역 함수
  // - 키가 "common.", "greet.", "calculate.", "time." 등으로 시작하면 절대 경로로 처리
  // - 그렇지 않으면 namespace prefix 추가
  const t = (key: string, params?: Record<string, string | number>) => {
    const topLevelKeys = ["common", "greet", "calculate", "time"];
    const isAbsoluteKey = topLevelKeys.some((k) => key.startsWith(`${k}.`));
    
    const fullKey = isAbsoluteKey || !namespace ? key : `${namespace}.${key}`;
    return translate(messages, fullKey, params);
  };

  // Intl용 로케일 문자열
  const intlLocale = localeMap[locale];

  return { t, locale, intlLocale, messages };
}

