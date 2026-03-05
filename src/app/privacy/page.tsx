import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-6 md:px-12 selection:bg-indigo-900 selection:text-white">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 p-10 md:p-16 shadow-sm">
                <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-10 hover:text-indigo-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    돌아가기
                </Link>

                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                    개인정보처리방침
                </h1>
                <p className="text-slate-500 text-sm mb-12">시행일자: 2026년 3월 4일</p>

                <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
                    <p className="font-medium">
                        (주)큐브인스피레이션그룹(이하 "회사"라 함)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">1. 개인정보의 수집 및 이용 목적</h2>
                        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별 및 인증, 회원자격 유지 및 관리</li>
                            <li>기업 진단 리포트 생성 및 전송, 전문가 매칭 서비스 제공</li>
                            <li>서비스 부정이용 방지, 각종 고지 및 통지, 고충처리</li>
                            <li>신규 서비스 개발 및 마케팅/광고에의 활용</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">2. 수집하는 개인정보 항목</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>필수항목: 이메일 주소, 비밀번호, 이름, 기업명, 직책, 연락처</li>
                            <li>선택항목: 기업 상세 정보 (매출, 투자 단계 등 비즈니스 진단에 필요한 사업 데이터)</li>
                            <li>자동수집항목: IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">3. 개인정보의 보유 및 이용기간</h2>
                        <p>
                            원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                            <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                            <li>웹사이트 방문기록: 3개월</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. 개인정보의 파기절차 및 방법</h2>
                        <p>
                            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>파기절차: 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정 기간 보관된 후 파기됩니다.</li>
                            <li>파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 정보는 분쇄기나 소각을 통하여 파기합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. 개인정보 제3자 제공</h2>
                        <p>
                            회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>이용자들이 사전에 동의한 경우 (예: 전문가 컨설팅 매칭을 위한 파트너사 제공)</li>
                            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
