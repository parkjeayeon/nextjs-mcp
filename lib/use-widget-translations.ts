"use client";

import { useMemo, useState, useEffect } from "react";
import { getMessages, translate, localeMap, type Locale, supportedLocales, fallbackLocale } from "./i18n";

/**
 * 위젯 전용 번역 훅
 * - useSearchParams 사용하지 않음 (Suspense 이슈 방지)
 * - 브라우저 언어 또는 기본값 사용
 */
export function useWidgetTranslations(namespace?: string) {
  const [locale, setLocale] = useState<Locale>(fallbackLocale);

  useEffect(() => {
    // 브라우저 언어 감지
    if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.split("-")[0];
      if (supportedLocales.includes(browserLang as Locale)) {
        setLocale(browserLang as Locale);
      }
    }

    // URL 파라미터에서 locale 확인 (클라이언트에서만)
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLocale = urlParams.get("locale");
      if (urlLocale && supportedLocales.includes(urlLocale as Locale)) {
        setLocale(urlLocale as Locale);
      }
    }
  }, []);

  const messages = useMemo(() => getMessages(locale), [locale]);

  // 번역 함수
  const t = (key: string, params?: Record<string, string | number>) => {
    // 절대 경로 키 (common., greet., calculate., time.)는 그대로 사용
    const topLevelKeys = ["common", "greet", "calculate", "time"];
    const isAbsoluteKey = topLevelKeys.some((k) => key.startsWith(`${k}.`));

    const fullKey = isAbsoluteKey || !namespace ? key : `${namespace}.${key}`;
    return translate(messages, fullKey, params);
  };

  // Intl용 로케일 문자열
  const intlLocale = localeMap[locale];

  return { t, locale, intlLocale, messages };
}

