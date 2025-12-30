"use client";

import { useIsChatGptApp } from "../hooks";

export default function WidgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isChatGptApp = useIsChatGptApp();

  // ChatGPT 앱이 아니면 차단 메시지 표시
  if (!isChatGptApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
        <div className="relative">
          {/* 글로우 효과 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl blur-lg opacity-40" />

          {/* 카드 */}
          <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl p-10 text-center border border-white/10 max-w-md">
            {/* 아이콘 */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-5xl">🔒</span>
            </div>

            {/* 제목 */}
            <h1 className="text-2xl font-bold text-white mb-3">
              ChatGPT 전용 위젯
            </h1>

            {/* 설명 */}
            <p className="text-slate-400 mb-8 leading-relaxed">
              이 페이지는 ChatGPT Apps에서만
              <br />
              접근할 수 있습니다.
            </p>

            {/* 버튼 */}
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-purple-500/25"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              홈으로 가기
            </a>

            {/* 추가 안내 */}
            <p className="text-slate-500 text-sm mt-8">
              ChatGPT에서{" "}
              <code className="bg-slate-800 px-2 py-1 rounded text-purple-400">
                greet
              </code>
              ,{" "}
              <code className="bg-slate-800 px-2 py-1 rounded text-purple-400">
                calculate
              </code>
              ,{" "}
              <code className="bg-slate-800 px-2 py-1 rounded text-purple-400">
                get_time
              </code>{" "}
              도구를 사용해보세요!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

