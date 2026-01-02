"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function ToolsPage() {
  const t = useTranslations("tools");

  const tools = [
    {
      id: "greet",
      emoji: "👋",
      title: t("greet.title"),
      description: t("greet.description"),
      parameters: [
        { name: "name", type: "string", description: t("greet.param_name") },
        {
          name: "language",
          type: "enum",
          description: t("greet.param_language"),
          default: "ko",
        },
      ],
      example: t("greet.example"),
      gradient: "from-violet-500 to-purple-500",
    },
    {
      id: "calculate",
      emoji: "🧮",
      title: t("calculate.title"),
      description: t("calculate.description"),
      parameters: [
        {
          name: "operation",
          type: "enum",
          description: t("calculate.param_operation"),
        },
        { name: "a", type: "number", description: t("calculate.param_a") },
        { name: "b", type: "number", description: t("calculate.param_b") },
      ],
      example: t("calculate.example"),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "get_time",
      emoji: "🕐",
      title: t("get_time.title"),
      description: t("get_time.description"),
      parameters: [
        {
          name: "timezone",
          type: "string",
          description: t("get_time.param_timezone"),
          default: "Asia/Seoul",
        },
      ],
      example: t("get_time.example"),
      gradient: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        {/* 헤더 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </div>

        {/* 도구 목록 */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <Card key={tool.id} className="overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${tool.gradient}`} />
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-4xl`}
                  >
                    {tool.emoji}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 파라미터 */}
                <div>
                  <h4 className="font-semibold mb-3">{t("parameters")}</h4>
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">
                            {t("name")}
                          </th>
                          <th className="text-left p-3 font-medium">
                            {t("type")}
                          </th>
                          <th className="text-left p-3 font-medium">
                            {t("description_col")}
                          </th>
                          <th className="text-left p-3 font-medium">
                            {t("default")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tool.parameters.map((param) => (
                          <tr key={param.name} className="border-b last:border-0">
                            <td className="p-3">
                              <code className="bg-background px-2 py-1 rounded">
                                {param.name}
                              </code>
                            </td>
                            <td className="p-3 text-muted-foreground">
                              {param.type}
                            </td>
                            <td className="p-3">{param.description}</td>
                            <td className="p-3 text-muted-foreground">
                              {param.default || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 예시 */}
                <div>
                  <h4 className="font-semibold mb-3">{t("example")}</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm">{t("examplePrompt")}</p>
                    <p className="mt-2 text-lg font-medium">{tool.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

