'use client';

import React, { useState } from 'react';
import { 
    FileText, 
    Plus, 
    Search, 
    Filter, 
    ChevronRight, 
    Save, 
    Printer, 
    Wand2, 
    ArrowLeft,
    ChevronDown,
    Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import DiagnosisRadarChart from '@/components/report/RadarChart';

// --- MOCK DATA ---
const REPORT_LIST = [
    { id: '1', title: '2026 테스트 사업 종합 성과 보고서', date: '2026-03-25', status: '초안 작성중', program: '2026 테스트 사업' },
    { id: '2', title: '창업성장기술개발 최종 결과 보고서', date: '2026-02-10', status: '승인 완료', program: '디딤돌 과제 1차' },
    { id: '3', title: '글로벌 액셀러레이팅 월간 리포트 (3월)', date: '2026-03-01', status: '검토 중', program: 'GAPS 2024' },
];

const MOCK_RADAR_DATA = {
    D1: 82, D2: 74, D3: 68, D4: 85, D5: 72, D6: 78, D7: 70
};

const MOCK_RADAR_PREV = {
    D1: 65, D2: 60, D3: 55, D4: 70, D5: 62, D6: 64, D7: 58
};

// --- COMPONENTS ---

export default function ReportsPage() {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const handleEdit = (report: any) => {
        setSelectedReport(report);
        setView('editor');
    };

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key="list"
                    >
                        <ListView onEdit={handleEdit} />
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        key="editor"
                    >
                        <EditorView report={selectedReport} onBack={() => setView('list')} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// 1-Depth: List View
function ListView({ onEdit }: { onEdit: (report: any) => void }) {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">사업 결과 보고 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">사업별 진단 데이터를 기반으로 종합 성과 보고서를 생성하고 관리합니다.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-11 px-6 shadow-lg shadow-indigo-100 flex items-center gap-2">
                    <Plus size={18} />
                    새 보고서 작성
                </Button>
            </div>

            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                            <Search size={14} className="text-slate-400" />
                            <input type="text" placeholder="보고서명 검색..." className="bg-transparent border-none outline-none text-[13px] w-48" />
                        </div>
                        <Button variant="outline" className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 text-[12px] font-bold">
                            <Filter size={14} className="mr-2" />
                            필터
                        </Button>
                    </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {REPORT_LIST.map((report) => (
                        <div key={report.id} className="p-6 hover:bg-slate-50 transition-all group flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{report.title}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[12px] text-slate-400 font-medium">{report.program}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="text-[12px] text-slate-400 font-medium">{report.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge className={`border-none font-bold text-[11px] px-2.5 py-1 rounded-lg ${
                                    report.status === '승인 완료' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                    {report.status}
                                </Badge>
                                <Button 
                                    onClick={() => onEdit(report)}
                                    className="bg-white border border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 rounded-xl px-4 h-10 text-[13px] font-bold transition-all"
                                >
                                    작성/관리
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

// 2-Depth: Editor View (Matching Screenshot)
function EditorView({ report, onBack }: { report: any, onBack: () => void }) {
    const [sidebarToggles, setSidebarToggles] = useState({
        stats: true,
        radar: true,
        detailed: true,
        members: true
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tighter">보고서 작성/관리</h2>
                            <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[10px] h-5">DEMO</Badge>
                        </div>
                        <p className="text-[14px] text-slate-400 font-medium">{report?.program || '2026 테스트 사업'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-12 px-6 border-slate-200 text-slate-700 font-bold rounded-[18px] bg-white shadow-sm flex items-center gap-2.5">
                        <Wand2 size={18} className="text-purple-500" />
                        초안 생성
                    </Button>
                    <Button className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-[18px] shadow-xl shadow-emerald-100 flex items-center gap-2.5 transition-all">
                        <Save size={18} />
                        보고서 저장
                    </Button>
                    <Button className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-[18px] shadow-xl shadow-slate-200 flex items-center gap-2.5 transition-all">
                        <Printer size={18} />
                        미리보기/인쇄
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Main Content (3/4) */}
                <div className="xl:col-span-3 space-y-8">
                    {/* Executive Summary Card */}
                    <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-50 py-6 px-10">
                            <CardTitle className="text-[15px] font-bold text-slate-700 flex items-center gap-3">
                                <FileText size={20} className="text-indigo-600" />
                                종합 요약 (Executive Summary)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-10">
                            <div className="bg-slate-50 rounded-[24px] p-8 border border-slate-100 min-h-[220px]">
                                <p className="text-[13px] font-bold text-slate-400 mb-4 tracking-widest">[1. 사업 개요 및 참여 현황]</p>
                                <textarea 
                                    className="w-full bg-transparent border-none focus:ring-0 text-[15px] leading-[1.8] text-slate-700 font-medium resize-none min-h-[140px]"
                                    defaultValue={`본 사업(2026 테스트 사업)은 총 13개 참여 기업을 대상으로 3차에 걸친 종합 역량 진단을 수행하였습니다. 진단 참여율은 1차 13개사(100%) -> 3차 7개사(54%)로, 지속 참여 기업의 평균 점수는 1차 51.8점(13개사) -> 2차 65.2점(10개사) -> 3차 77.6점(7개사)으로 꾸준한 상승세를 기록하였습니다.`}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Radar Chart Card */}
                    <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-50 py-6 px-10 flex flex-row items-center justify-between">
                            <CardTitle className="text-[15px] font-bold text-slate-700 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                                    <Layout size={16} className="text-indigo-600" />
                                </span>
                                역량 항목별 분포 차트 미리보기 (추이 분석)
                            </CardTitle>
                            <Badge className="bg-indigo-600 text-white border-none px-3 py-1 rounded-full text-[10px] font-black">총 3개 차수 데이터</Badge>
                        </CardHeader>
                        <CardContent className="p-10 flex items-center justify-center">
                            <div className="w-full max-w-[540px]">
                                <DiagnosisRadarChart 
                                    sectionScores={MOCK_RADAR_DATA} 
                                    previousScores={MOCK_RADAR_PREV} 
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar (1/4) */}
                <div className="space-y-8">
                    {/* Report Settings */}
                    <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white p-8">
                        <h4 className="text-[15px] font-black text-slate-800 mb-2">보고서 구성 설정</h4>
                        <p className="text-[11px] text-slate-400 font-bold mb-8">인쇄물에 포함될 항목을 선택하세요.</p>
                        
                        <div className="space-y-6">
                            {[
                                { id: 'stats', label: '핵심 요약 지표 (참여율, 평균)' },
                                { id: 'radar', label: '역량 항목별 분포 차트' },
                                { id: 'detailed', label: '항목별 상세 분석 및 코멘트' },
                                { id: 'members', label: '참여 기업 명단 및 결과 요약' },
                            ].map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <span className="text-[13px] font-bold text-slate-600">{item.label}</span>
                                    <Switch 
                                        checked={(sidebarToggles as any)[item.id]} 
                                        onCheckedChange={(val) => setSidebarToggles(prev => ({ ...prev, [item.id]: val }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Template Selection */}
                    <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white p-8">
                        <h4 className="text-[14px] font-bold text-slate-800 mb-6 uppercase tracking-wider">보고서 템플릿</h4>
                        <div className="space-y-3">
                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-[20px] flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-600 rounded-xl text-white">
                                        <Layout size={16} />
                                    </div>
                                    <span className="text-[13px] font-black text-indigo-700">기본 기관 통합 양식</span>
                                </div>
                                <ChevronRight size={16} className="text-indigo-300" />
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-[20px] flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-200 rounded-xl text-slate-400 group-hover:bg-slate-300 group-hover:text-slate-500">
                                        <Plus size={16} />
                                    </div>
                                    <span className="text-[13px] font-bold text-slate-500">새 템플릿 추가</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
