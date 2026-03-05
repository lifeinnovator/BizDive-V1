import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6 md:px-12 selection:bg-indigo-900 selection:text-white">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-10 md:p-16 shadow-sm">
                <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-10 hover:text-indigo-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    돌아가기
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                    이용약관
                </h1>
                <p className="text-slate-500 text-sm mb-12">시행일자: 2026년 3월 4일</p>

                <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제1조 (목적)</h2>
                        <p>
                            본 약관은 (주)큐브인스피레이션그룹(이하 "회사")이 제공하는 BizDive 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제2조 (용어의 정의)</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>"서비스"라 함은 회사가 제공하는 기업 진단 및 리포트 제공, 후속 매칭 등을 의미합니다.</li>
                            <li>"회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제3조 (약관의 효력 및 변경)</h2>
                        <p>
                            회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 공지합니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제4조 (회원가입 및 이용계약의 성립)</h2>
                        <p>
                            이용계약은 회원이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 대하여 동의를 한 다음 회원가입 신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써 성립됩니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제5조 (서비스의 제공 및 변경)</h2>
                        <p>
                            회사는 회원에게 기업 상태 진단, 진단 리포트 생성, 전문가 컨설팅 매칭 등의 서비스를 제공하며, 운영상, 기술상의 필요에 따라 제공하고 있는 일부 또는 전부의 서비스를 향후 변경할 수 있습니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제6조 (회사의 의무)</h2>
                        <p>
                            회사는 관련법과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">제7조 (면책 조항)</h2>
                        <p>
                            회사가 제공하는 진단 리포트 및 컨설팅 내용은 기업의 성장을 돕기 위한 참고 자료이며, 회사는 이를 바탕으로 한 회원의 비즈니스적 의사결정 및 그 결과에 대해 직접적인 책임을 지지 않습니다. 자연재해, 불가항력적 사유로 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
