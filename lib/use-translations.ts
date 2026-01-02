"use client";

import { useSearchParams } from "next/navigation";
import { getMessages, translate, localeMap, type Locale, supportedLocales, fallbackLocale } from "./i18n";
import { useMemo } from "react";

export function useTranslations(namespace?: string) {
  const searchParams = useSearchParams();

  // 우선순위: URL ?locale= > 브라우저 언어 > 기본값
  const locale = useMemo(() => {
    // 1. URL 파라미터에서 locale 확인
    const urlLocale = searchParams.get("locale");
    if (urlLocale && supportedLocales.includes(urlLocale as Locale)) {
      return urlLocale as Locale;
    }

    // 2. 브라우저 언어 확인
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.split("-")[0];
      if (supportedLocales.includes(browserLang as Locale)) {
        return browserLang as Locale;
      }
    }

    // 3. 기본값
    return fallbackLocale;
  }, [searchParams]);

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
