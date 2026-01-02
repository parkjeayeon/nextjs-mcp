"use client";

import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { useWidgetProps, useMaxHeight, useDisplayMode } from "@/app/hooks";
import { useTranslations } from "@/lib/use-translations";

type GreetData = {
  name?: string;
  language?: string;
  greeting?: string;
  timestamp?: string;
  result?: {
    structuredContent?: {
      name?: string;
      language?: string;
      greeting?: string;
    };
  };
};

export default function GreetWidget() {
  const props = useWidgetProps<GreetData>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();
  const { t, locale } = useTranslations();

  const data = props?.result?.structuredContent || props;
  const name = data?.name || "Guest";
  // MCP에서 전달한 language가 있으면 사용, 없으면 context locale 사용
  const language = data?.language || locale;
  const greeting = data?.greeting || t("greet.welcome", { name });

  const languageEmoji: Record<string, string> = {
    ko: "🇰🇷",
    en: "🇺🇸",
    ja: "🇯🇵",
  };

  const languageLabel: Record<string, string> = {
    ko: "한국어",
    en: "English",
    ja: "日本語",
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950 flex items-center justify-center p-6"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      <div className="w-full max-w-md">
        {/* 메인 카드 */}
        <div className="relative">
          {/* 글로우 효과 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-lg opacity-60 animate-pulse" />

          {/* 카드 본체 */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            {/* 이모지 애니메이션 */}
            <div className="text-center mb-6">
              <span className="text-7xl inline-block animate-bounce">
                {languageEmoji[language] || "👋"}
              </span>
            </div>

            {/* 인사말 */}
            <h1 className="text-3xl font-bold text-center text-white mb-6 leading-relaxed">
              {greeting}
            </h1>

            {/* 정보 뱃지들 */}
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge className="px-4 py-2">
                <span className="mr-2">👤</span>
                {name}
              </Badge>
              <Badge className="px-4 py-2">
                <span className="mr-2">{languageEmoji[language]}</span>
                {languageLabel[language] || language.toUpperCase()}
              </Badge>
            </div>

            {/* 데코레이션 */}
            <div className="mt-8 flex justify-center gap-2">
              {["🎉", "✨", "🎊", "💫", "🌟"].map((emoji, i) => (
                <span
                  key={i}
                  className="text-2xl opacity-60 animate-bounce"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <p className="text-center text-slate-500 text-sm mt-6">
          {t("common.mcpTool")}:{" "}
          <code className="bg-slate-800/50 px-2 py-1 rounded">greet</code>
        </p>
      </div>
    </div>
  );
}
