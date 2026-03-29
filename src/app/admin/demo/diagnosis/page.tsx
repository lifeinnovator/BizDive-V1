'use client';

import React, { useState } from 'react';
import { 
    ClipboardCheck, 
    Search, 
    Filter, 
    ChevronRight, 
    ArrowLeft,
    TrendingUp,
    ExternalLink,
    LineChart,
    PieChart,
    BarChart3,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import DiagnosisRadarChart from '@/components/report/RadarChart';

// --- MOCK DATA ---
const DIAGNOSIS_DATA = [
    { id: '1', company: '테크스타트업 (주)', score: 86, level: '고성장', progress: '100%', updated: '2026-03-24' },
    { id: '2', company: '에코이노베이션', score: 65, level: '성장기', progress: '100%', updated: '2026-03-22' },
    { id: '3', company: '핀테크코리아', score: 42, level: '초기', progress: '60%', updated: '2026-03-25' },
    { id: '4', company: '로컬크리에이터랩', score: 72, level: '성장기', progress: '100%', updated: '2026-03-20' },
    { id: '5', company: '바이오네트웍스', score: 91, level: '고성장', progress: '100%', updated: '2026-03-23' },
];

export default function DiagnosisPage() {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    const handleDetail = (company: any) => {
        setSelectedCompany(company);
        setView('detail');
    };

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="list">
                        <DiagnosisListView onDetail={handleDetail} />
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="detail">
                        <DiagnosisDetailView company={selectedCompany} onBack={() => setView('list')} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DiagnosisListView({ onDetail }: { onDetail: (c: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">사업별 진단 현황</h2>
                    <p className="text-sm text-slate-500 mt-1">참여 기업들의 7D 진단 수행 상태와 영역별 점수를 통합 관리합니다.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-200 text-slate-600 font-bold bg-white flex items-center gap-2">
                        <Filter size={16} />
                        필터 설정
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">기업명 / 프로그램</th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">최종 점수</th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">성장 단계</th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">진행률</th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">최근 업데이트</th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">상세</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {DIAGNOSIS_DATA.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-slate-700 text-[14px] group-hover:text-indigo-600 transition-colors">{item.company}</div>
                                        <div className="text-[11px] text-slate-400 font-medium mt-0.5">2026 테스트 사업</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[16px] font-black text-slate-800">{item.score}</span>
                                            <span className="text-[10px] font-bold text-slate-300">PT</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge className={`border-none font-bold text-[10px] px-2.5 py-1 rounded-lg ${
                                            item.level === '고성장' ? 'bg-indigo-50 text-indigo-600' :
                                            item.level === '성장기' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {item.level}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-600 rounded-full" style={{ width: item.progress }} />
                                            </div>
                                            <span className="text-[12px] font-bold text-slate-500">{item.progress}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-[12px] font-medium text-slate-400">{item.updated}</td>
                                    <td className="px-8 py-6 text-right">
                                        <Button 
                                            onClick={() => onDetail(item)}
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-xl"
                                        >
                                            <ChevronRight size={20} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

function DiagnosisDetailView({ company, onBack }: { company: any, onBack: () => void }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{company.company}</h2>
                    <p className="text-sm text-slate-500 mt-1">기업별 심층 진단 리포트 및 영역별 분석 (2-Depth)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Radar Chart */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] bg-white p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h4 className="text-[15px] font-bold text-slate-800 flex items-center gap-2.5">
                            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                            7D 영역별 진단 분포
                        </h4>
                        <div className="text-right">
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Score</p>
                            <p className="text-2xl font-black text-slate-800 leading-none">{company.score}<span className="text-[14px] ml-1 opacity-20">PT</span></p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center py-6">
                        <div className="w-full max-w-[480px]">
                            <DiagnosisRadarChart 
                                sectionScores={{ D1: 85, D2: 78, D3: 65, D4: 92, D5: 74, D6: 81, D7: 77 }} 
                                previousScores={{ D1: 60, D2: 65, D3: 50, D4: 75, D5: 60, D6: 68, D7: 62 }} 
                            />
                        </div>
                    </div>
                </Card>

                {/* Right: Key Insights */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm rounded-[32px] bg-white p-8">
                        <h4 className="text-[14px] font-black text-slate-800 mb-6 flex items-center gap-2">
                            <TrendingUp size={18} className="text-emerald-500" />
                            영역별 점수 요약
                        </h4>
                        <div className="space-y-4">
                            {[
                                { name: '시장 기회', score: 85, color: 'indigo' },
                                { name: '문제 정의', score: 78, color: 'emerald' },
                                { name: '성장 전략', score: 65, color: 'rose' },
                                { name: '제품/서비스', score: 92, color: 'indigo' },
                                { name: '팀 역량', score: 74, color: 'amber' },
                            ].map((s) => (
                                <div key={s.name} className="flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-slate-500">{s.name}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className={`h-full bg-${s.color}-500 rounded-full`} style={{ width: `${s.score}%` }} />
                                        </div>
                                        <span className="text-[12px] font-black text-slate-800">{s.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm rounded-[32px] bg-slate-900 p-8 text-white relative group">
                        <div className="relative z-10">
                            <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-2">Management Action</h4>
                            <p className="text-[16px] font-bold leading-relaxed mb-6">
                                '성장 전략' 점수가 낮으나 '제품 구현' 역량이 매우 높습니다. 기술 특례 상장 또는 스케일업 팁스 연계를 추천합니다.
                            </p>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl h-11 transition-all">
                                행동 제언 전문 보기
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
