"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  const features = [
    {
      emoji: "⚡",
      title: t("features.fastResponse"),
      description: t("features.fastResponseDesc"),
    },
    {
      emoji: "🎨",
      title: t("features.beautifulUI"),
      description: t("features.beautifulUIDesc"),
    },
    {
      emoji: "🔒",
      title: t("features.security"),
      description: t("features.securityDesc"),
    },
    {
      emoji: "🌍",
      title: t("features.i18n"),
      description: t("features.i18nDesc"),
    },
  ];

  const techStack = [
    { name: "Next.js 16", description: t("tech.nextjs") },
    { name: "MCP SDK", description: t("tech.mcp") },
    { name: "Tailwind CSS", description: t("tech.tailwind") },
    { name: "shadcn/ui", description: t("tech.shadcn") },
    { name: "@openai/apps-sdk-ui", description: t("tech.appsUI") },
    { name: "TypeScript", description: t("tech.typescript") },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        {/* 헤더 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </div>

        {/* 기능 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t("keyFeatures")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={i}>
                <CardHeader>
                  <span className="text-4xl mb-2">{feature.emoji}</span>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">
            {t("techStack")}
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {techStack.map((tech, i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-lg bg-muted/50"
                    >
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tech.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 아키텍처 */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">
            {t("architecture")}
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>{t("systemStructure")}</CardTitle>
                <CardDescription>{t("flowDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  {`
ChatGPT User
     ↓ (Tool call request)
ChatGPT Model
     ↓ (MCP Protocol)
┌─────────────────────────────────┐
│        Next.js MCP Server       │
│  (/mcp endpoint)                │
├─────────────────────────────────┤
│  • greet: Greeting              │
│  • calculate: Calculator        │
│  • get_time: Current Time       │
└─────────────────────────────────┘
     ↓ (structuredContent + HTML)
┌─────────────────────────────────┐
│    ChatGPT Widget iframe        │
│  (@openai/apps-sdk-ui used)     │
│                                 │
│  Access data via                │
│  window.openai.toolOutput       │
└─────────────────────────────────┘
                  `.trim()}
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

