import type { NextConfig } from "next";
import { baseURL } from "./baseUrl";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// assetPrefix는 실제 배포 환경에서만 사용 (localhost에서는 사용하지 않음)
const isLocalhost =
  !process.env.BASE_URL ||
  process.env.BASE_URL.includes("localhost") ||
  process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // 로컬 개발 환경에서는 assetPrefix를 사용하지 않음
  // ChatGPT 위젯 iframe 환경에서만 assetPrefix 필요
  ...(isLocalhost ? {} : { assetPrefix: baseURL }),
};

export default withNextIntl(nextConfig);
