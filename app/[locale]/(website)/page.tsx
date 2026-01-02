"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  const tc = useTranslations("common");

  const tools = [
    {
      id: "greet",
      emoji: "👋",
      title: t("tools.greet.title"),
      description: t("tools.greet.description"),
      gradient: "from-violet-500 to-purple-500",
    },
    {
      id: "calculate",
      emoji: "🧮",
      title: t("tools.calculate.title"),
      description: t("tools.calculate.description"),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "get_time",
      emoji: "🕐",
      title: t("tools.get_time.title"),
      description: t("tools.get_time.description"),
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div>
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t("badge")}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {t("title")}
              </span>
              <br />
              {t("subtitle")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a
                  href="https://chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tc("useInChatGPT")}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tools">{t("exploreTools")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 도구 카드 섹션 */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("availableTools")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("toolsDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-3xl mb-2 group-hover:scale-110 transition-transform`}
                  >
                    {tool.emoji}
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <code className="text-sm bg-muted px-3 py-1.5 rounded-md font-mono">
                    {tool.id}
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MCP 서버 정보 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🔌</span> {t("mcpConnection")}
                </CardTitle>
                <CardDescription>{t("mcpDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background rounded-lg p-4 border">
                  <p className="text-sm text-muted-foreground mb-2">
                    {t("mcpEndpoint")}
                  </p>
                  <code className="text-lg font-mono break-all">
                    https://your-domain.com/mcp
                  </code>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("devNote")}{" "}
                  <code className="bg-muted px-2 py-0.5 rounded">
                    http://localhost:3000/mcp
                  </code>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

