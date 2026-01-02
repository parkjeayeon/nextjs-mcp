import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  localePrefix: "always", // 모든 URL에 locale 포함
});

export type Locale = (typeof routing.locales)[number];

