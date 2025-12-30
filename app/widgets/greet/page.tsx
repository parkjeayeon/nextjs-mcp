"use client";

import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
} from "../../hooks";

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

  const data = props?.result?.structuredContent || props;
  const name = data?.name || "Guest";
  const language = data?.language || "ko";
  const greeting = data?.greeting || `안녕하세요, ${name}님!`;

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
      className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-fuchsia-950 flex items-center justify-center p-6"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      <div className="w-full max-w-md">
        {/* 메인 카드 */}
        <div className="relative">
          {/* 글로우 효과 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-lg opacity-75 animate-pulse" />
          
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
              <div className="bg-violet-500/20 backdrop-blur border border-violet-400/30 rounded-full px-5 py-2.5 flex items-center gap-2">
                <span className="text-xl">👤</span>
                <span className="text-violet-200 font-medium">{name}</span>
              </div>
              
              <div className="bg-fuchsia-500/20 backdrop-blur border border-fuchsia-400/30 rounded-full px-5 py-2.5 flex items-center gap-2">
                <span className="text-xl">{languageEmoji[language]}</span>
                <span className="text-fuchsia-200 font-medium">
                  {languageLabel[language] || language.toUpperCase()}
                </span>
              </div>
            </div>

            {/* 데코레이션 */}
            <div className="mt-8 flex justify-center gap-2">
              {["🎉", "✨", "🎊", "💫", "🌟"].map((emoji, i) => (
                <span
                  key={i}
                  className="text-2xl opacity-60"
                  style={{
                    animation: `bounce 1s ease-in-out ${i * 0.1}s infinite`,
                  }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <p className="text-center text-slate-500 text-sm mt-6">
          MCP Tool: <code className="bg-slate-800/50 px-2 py-1 rounded">greet</code>
        </p>
      </div>
    </div>
  );
}

