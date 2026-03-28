import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://bizdive.vercel.app'
  ),
  title: {
    default: "비즈다이브(BizDive) | 7D 기업경영 정밀자가진단",
    template: "%s | BizDive"
  },
  description: "비즈다이브(BizDive)는 7차원(7D) 정밀 진단 모델을 통해 기업의 현재 상태를 입체 분석하고, 성장을 위한 구체적인 액션 아이템을 제안하는 경영 진단 솔루션입니다.",
  keywords: ["경영진단", "스타트업지원", "성과관리", "비즈니스모델", "데이터기반성장", "SEO", "GEO", "창업컨설팅"],
  icons: {
    icon: [
      { url: '/favicon.png?v=2' },
    ],
    apple: [
      { url: '/favicon.png?v=2' },
    ],
  },
  openGraph: {
    title: "BizDive - 7D 기업경영 심층자가진단",
    description: "데이터로 증명하는 비즈니스 경쟁력. 7가지 핵심 지표로 기업의 성장을 정밀 분석하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "비즈다이브",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "비즈다이브",
              "url": "https://bizdive.kr",
              "logo": "https://bizdive.kr/BizDive_Logo_Confirm.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "admin@bizdive.kr",
                "contactType": "customer service"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "BizDive",
              "operatingSystem": "All",
              "applicationCategory": "BusinessApplication",
              "description": "7D 기업경영 정밀자가진단 시스템. 데이터 기반의 비즈니스 경쟁력 분석 도구입니다."
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">

        {children}
        <Toaster position="top-center" richColors />
        <div className="fixed bottom-1 right-1 text-[10px] text-gray-300 pointer-events-none z-50">
          v2.1.2
        </div>
      </body>
    </html>
  );
}
