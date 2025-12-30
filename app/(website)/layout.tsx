import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              홈
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              소개
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              도구들
            </Link>
            <Button asChild size="sm">
              <a
                href="https://chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ChatGPT에서 사용하기
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
            <p className="text-sm text-muted-foreground">
              ChatGPT Apps SDK + Next.js로 제작됨
            </p>
            <div className="flex gap-4">
              <a
                href="https://developers.openai.com/apps-sdk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Apps SDK 문서
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

