import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tools = [
  {
    id: "greet",
    emoji: "👋",
    title: "인사하기 (greet)",
    description: "다국어로 인사를 합니다",
    parameters: [
      { name: "name", type: "string", description: "인사할 사람의 이름" },
      {
        name: "language",
        type: "enum",
        description: "인사 언어 (ko, en, ja)",
        default: "ko",
      },
    ],
    example: '"홍길동에게 영어로 인사해줘"',
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "calculate",
    emoji: "🧮",
    title: "계산기 (calculate)",
    description: "사칙연산을 수행합니다",
    parameters: [
      {
        name: "operation",
        type: "enum",
        description: "연산 종류 (add, subtract, multiply, divide)",
      },
      { name: "a", type: "number", description: "첫 번째 숫자" },
      { name: "b", type: "number", description: "두 번째 숫자" },
    ],
    example: '"123 곱하기 456 계산해줘"',
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "get_time",
    emoji: "🕐",
    title: "현재 시간 (get_time)",
    description: "지정한 타임존의 현재 시간을 반환합니다",
    parameters: [
      {
        name: "timezone",
        type: "string",
        description: "타임존",
        default: "Asia/Seoul",
      },
    ],
    example: '"도쿄 현재 시간 알려줘"',
    gradient: "from-indigo-500 to-blue-500",
  },
];

export default function ToolsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        {/* 헤더 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">도구 목록</h1>
          <p className="text-lg text-muted-foreground">
            ChatGPT에서 사용할 수 있는 MCP 도구들입니다. 각 도구는 고유한 위젯
            UI를 가지고 있습니다.
          </p>
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
                  <h4 className="font-semibold mb-3">파라미터</h4>
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">이름</th>
                          <th className="text-left p-3 font-medium">타입</th>
                          <th className="text-left p-3 font-medium">설명</th>
                          <th className="text-left p-3 font-medium">기본값</th>
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
                  <h4 className="font-semibold mb-3">사용 예시</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm">ChatGPT에서 이렇게 말해보세요:</p>
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

