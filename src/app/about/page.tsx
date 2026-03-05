import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutService() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6 md:px-12 selection:bg-indigo-900 selection:text-white">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-10 md:p-16 shadow-sm">
                <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-10 hover:text-indigo-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    돌아가기
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                    서비스 정보
                </h1>
                <p className="text-slate-500 text-sm mb-12">Cube Inspiration Group., Co., Ltd.</p>

                <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">회사 소개</h2>
                        <p>
                            (주)큐브인스피레이션그룹은 혁신적인 아이디어를 발굴하고, 데이터 기반의 객관적인 진단을 통해 스타트업과 예비 창업자들의 비즈니스 성장을 지원하는 액셀러레이팅 파트너입니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제공 서비스 (BizDive)</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li><strong>스타트업 진단 및 컴퍼니 빌딩:</strong> 7차원의 입체적 진단 모델을 통해 비즈니스의 현재 상태를 분석하고 맞춤형 성장 리포트를 발급합니다.</li>
                            <li><strong>기관 파트너 통합 관리 시스템:</strong> 창업 지원 기관 및 엑셀러레이터가 포트폴리오 기업의 성장 추이를 관리하고, 진단 결과를 바탕으로 효과적인 멘토링 매칭을 진행할 수 있는 대시보드를 제공합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">연락처 및 소재지</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>상호명:</strong> (주)큐브인스피레이션그룹 (Cube Inspiration Group., Co., Ltd)</li>
                            <li><strong>대표이메일:</strong> life,innovator@gmail.com</li>
                            <li><strong>고객센터:</strong> 평일 10:00 - 17:00 (주말 및 공휴일 휴무)</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
