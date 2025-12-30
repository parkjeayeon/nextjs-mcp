import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // OPTIONS 요청 처리 (CORS preflight)
  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set("Access-Control-Allow-Headers", "*");
    return response;
  }

  // /widgets/* 경로 보호 - ChatGPT 전용
  if (pathname.startsWith("/widgets/")) {
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";
    const host = request.headers.get("host") || "";

    // MCP 서버의 내부 fetch 요청인지 확인
    // - Node.js 서버 요청 (user-agent에 node 포함)
    // - 같은 호스트에서의 요청 (referer가 같은 도메인)
    // - localhost 개발 환경
    const isInternalFetch =
      userAgent.toLowerCase().includes("node") ||
      userAgent.toLowerCase().includes("undici") ||
      referer.includes(host) ||
      referer.includes("localhost") ||
      referer.includes("127.0.0.1");

    // 일반 브라우저 직접 접근 차단
    if (!isInternalFetch) {
      // 홈으로 리다이렉트
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export const config = {
  matcher: "/:path*",
};
