"use client";

import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
  useRequestDisplayMode,
  useIsChatGptApp,
} from "./hooks";

// 도구 결과 타입 정의
type ToolResult = {
  toolType?: "greet" | "calculate" | "get_time";
  // greet
  name?: string;
  language?: string;
  greeting?: string;
  // calculate
  operation?: string;
  a?: number;
  b?: number;
  symbol?: string;
  result?: number;
  expression?: string;
  // get_time
  timezone?: string;
  formattedTime?: string;
  isoTime?: string;
  timestamp?: number | string;
};

type WidgetProps = {
  name?: string;
  result?: { structuredContent?: ToolResult };
};

// 인사 위젯 컴포넌트
function GreetWidget({ data }: { data: ToolResult }) {
  const languageEmoji = {
    ko: "🇰🇷",
    en: "🇺🇸",
    ja: "🇯🇵",
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl p-1 shadow-2xl">
        <div className="bg-slate-900 rounded-[22px] p-8 text-center">
          <div className="text-6xl mb-6 animate-bounce">
            {languageEmoji[data.language as keyof typeof languageEmoji] || "👋"}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            {data.greeting}
          </h2>
          <div className="flex justify-center gap-3 text-sm">
            <span className="bg-violet-500/20 text-violet-300 px-4 py-2 rounded-full border border-violet-500/30">
              👤 {data.name}
            </span>
            <span className="bg-fuchsia-500/20 text-fuchsia-300 px-4 py-2 rounded-full border border-fuchsia-500/30">
              🌐 {data.language?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 계산기 위젯 컴포넌트
function CalculateWidget({ data }: { data: ToolResult }) {
  const operationColors = {
    add: "from-emerald-400 to-teal-500",
    subtract: "from-rose-400 to-pink-500",
    multiply: "from-amber-400 to-orange-500",
    divide: "from-sky-400 to-blue-500",
  };

  const gradient =
    operationColors[data.operation as keyof typeof operationColors] ||
    "from-gray-400 to-gray-500";

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-1 shadow-2xl`}>
        <div className="bg-slate-900 rounded-[22px] p-8">
          <div className="text-center mb-6">
            <span className="text-5xl">🧮</span>
          </div>
          <div className="bg-slate-800 rounded-2xl p-6 font-mono">
            <div className="text-slate-400 text-lg mb-2 text-center">
              {data.expression}
            </div>
            <div className="text-5xl font-bold text-white text-center tracking-tight">
              = {data.result}
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.a}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">First</div>
            </div>
            <div className="text-3xl text-slate-500 self-center">{data.symbol}</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{data.b}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Second</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 시간 위젯 컴포넌트
function TimeWidget({ data }: { data: ToolResult }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
        <div className="bg-slate-900 rounded-[22px] p-8 text-center">
          <div className="text-6xl mb-6">🕐</div>
          <div className="bg-slate-800 rounded-2xl p-6 mb-6">
            <div className="text-2xl font-bold text-white tracking-tight">
              {data.formattedTime}
            </div>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full border border-indigo-500/30 text-sm">
              🌍 {data.timezone}
            </span>
            <span className="bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full border border-pink-500/30 text-sm font-mono">
              {data.isoTime?.split("T")[1]?.split(".")[0] || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 기본 위젯 (도구 미선택 시)
function DefaultWidget({ name, isChatGptApp }: { name?: string; isChatGptApp: boolean }) {
  return (
    <div className="w-full max-w-lg mx-auto">
      {!isChatGptApp && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-amber-200 font-medium text-sm">
                ChatGPT 앱 환경이 아닙니다
              </p>
              <p className="text-amber-200/70 text-xs mt-1">
                <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">window.openai</code> 객체가 감지되지 않았습니다
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-1 shadow-2xl">
        <div className="bg-slate-900 rounded-[22px] p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            🛠️ MCP Tools Demo
          </h1>
          <p className="text-slate-400 mb-8">ChatGPT Apps SDK + Next.js</p>

          <div className="grid gap-4 text-left">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👋</span>
                <span className="font-bold text-white">greet</span>
              </div>
              <p className="text-slate-400 text-sm">다국어로 인사하기 (ko/en/ja)</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🧮</span>
                <span className="font-bold text-white">calculate</span>
              </div>
              <p className="text-slate-400 text-sm">사칙연산 계산기</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🕐</span>
                <span className="font-bold text-white">get_time</span>
              </div>
              <p className="text-slate-400 text-sm">타임존별 현재 시간</p>
            </div>
          </div>

          {name && (
            <div className="mt-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <p className="text-emerald-300 text-sm">
                📨 도구 호출 결과: <span className="font-bold">{name}</span>
              </p>
            </div>
          )}

          <div className="mt-8 text-slate-500 text-xs">
            MCP 서버: <code className="bg-slate-800 px-2 py-1 rounded">/mcp</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const toolOutput = useWidgetProps<WidgetProps>();
  const maxHeight = useMaxHeight() ?? undefined;
  const displayMode = useDisplayMode();
  const requestDisplayMode = useRequestDisplayMode();
  const isChatGptApp = useIsChatGptApp();

  const structuredContent = toolOutput?.result?.structuredContent;
  const toolType = structuredContent?.toolType;
  const name = structuredContent?.name || toolOutput?.name;

  // 도구 타입에 따라 적절한 위젯 렌더링
  const renderWidget = () => {
    if (!structuredContent || !toolType) {
      return <DefaultWidget name={name} isChatGptApp={isChatGptApp} />;
    }

    switch (toolType) {
      case "greet":
        return <GreetWidget data={structuredContent} />;
      case "calculate":
        return <CalculateWidget data={structuredContent} />;
      case "get_time":
        return <TimeWidget data={structuredContent} />;
      default:
        return <DefaultWidget name={name} isChatGptApp={isChatGptApp} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex items-center justify-center p-6"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      {/* 풀스크린 버튼 */}
      {displayMode !== "fullscreen" && (
        <button
          aria-label="Enter fullscreen"
          className="fixed top-4 right-4 z-50 rounded-full bg-slate-800 text-slate-300 shadow-lg ring-1 ring-slate-700 p-3 hover:bg-slate-700 hover:text-white transition-all cursor-pointer"
          onClick={() => requestDisplayMode("fullscreen")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      )}

      {/* 메인 콘텐츠 */}
      <main className="w-full">{renderWidget()}</main>
    </div>
  );
}
