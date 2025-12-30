import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    emoji: "⚡",
    title: "빠른 응답",
    description: "Next.js와 Turbopack으로 빌드되어 빠른 응답 속도를 제공합니다.",
  },
  {
    emoji: "🎨",
    title: "아름다운 UI",
    description:
      "각 도구마다 고유한 위젯 UI가 ChatGPT 내에서 렌더링됩니다.",
  },
  {
    emoji: "🔒",
    title: "보안",
    description: "위젯은 ChatGPT 환경에서만 접근 가능하며, 일반 웹에서는 차단됩니다.",
  },
  {
    emoji: "🌍",
    title: "다국어 지원",
    description: "한국어, 영어, 일본어 등 다양한 언어를 지원합니다.",
  },
];

const techStack = [
  { name: "Next.js 16", description: "React 프레임워크" },
  { name: "MCP SDK", description: "Model Context Protocol" },
  { name: "Tailwind CSS", description: "스타일링" },
  { name: "shadcn/ui", description: "웹사이트 UI" },
  { name: "@openai/apps-sdk-ui", description: "위젯 UI" },
  { name: "TypeScript", description: "타입 안전성" },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        {/* 헤더 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">소개</h1>
          <p className="text-lg text-muted-foreground">
            MCP Tools Demo는 ChatGPT Apps SDK를 활용하여 만든 예제
            프로젝트입니다. ChatGPT 내에서 인터랙티브한 위젯을 렌더링하는 방법을
            보여줍니다.
          </p>
        </div>

        {/* 기능 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">주요 기능</h2>
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
          <h2 className="text-2xl font-bold text-center mb-8">기술 스택</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {techStack.map((tech, i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
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
          <h2 className="text-2xl font-bold text-center mb-8">아키텍처</h2>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>시스템 구성</CardTitle>
                <CardDescription>
                  ChatGPT와 MCP 서버, 위젯 UI의 동작 흐름
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  {`
ChatGPT 사용자
     ↓ (도구 호출 요청)
ChatGPT 모델
     ↓ (MCP 프로토콜)
┌─────────────────────────────────┐
│        Next.js MCP 서버         │
│  (/mcp 엔드포인트)              │
├─────────────────────────────────┤
│  • greet: 인사하기              │
│  • calculate: 계산기            │
│  • get_time: 현재 시간          │
└─────────────────────────────────┘
     ↓ (structuredContent + HTML)
┌─────────────────────────────────┐
│    ChatGPT 위젯 iframe          │
│  (@openai/apps-sdk-ui 사용)     │
│                                 │
│  window.openai.toolOutput로    │
│  데이터 접근                    │
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

