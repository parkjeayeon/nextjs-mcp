// ngrok 사용 시: BASE_URL 환경 변수 설정 필요
// 예: BASE_URL=https://xxxx.ngrok.io pnpm dev
export const baseURL =
  process.env.BASE_URL ||
  (process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://" +
      (process.env.VERCEL_ENV === "production"
        ? process.env.VERCEL_PROJECT_PRODUCTION_URL
        : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL));
