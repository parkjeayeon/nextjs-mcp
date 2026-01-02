"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";

function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = (params.locale as Locale) || routing.defaultLocale;

  return (
    <div className="flex items-center gap-1 border rounded-lg p-1">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
            currentLocale === locale
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("common");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 네비게이션 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            <span className="font-bold text-xl">MCP Tools</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("tools")}
            </Link>
            <LanguageSwitcher />
            <Button asChild size="sm">
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("useInChatGPT")}
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1">{children}</main>

      {/* 푸터 */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              <span className="font-semibold">MCP Tools Demo</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("madeWith")}</p>
            <div className="flex gap-4">
              <a
                href="https://developers.openai.com/apps-sdk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t("appsSdkDocs")}
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

