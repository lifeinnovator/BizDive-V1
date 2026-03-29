'use client';

import React, { useState } from 'react';
import { 
    Briefcase, 
    Plus, 
    Search, 
    MoreVertical, 
    ExternalLink, 
    Users, 
    Calendar,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK DATA ---
const PROJECTS = [
    { id: '1', name: '2024 창업성장기술개발(디딤돌) 과제', period: '2024.03 - 2024.12', companies: 60, status: '진행중', progress: 70 },
    { id: '2', name: '청년창업사관학교 14기 육성사업', period: '2024.04 - 2025.02', companies: 80, status: '진행중', progress: 95 },
    { id: '3', name: '글로벌 액셀러레이팅 프로그램 (GAPS)', period: '2024.01 - 2024.06', companies: 30, status: '완료', progress: 100 },
    { id: '4', name: '민관공동창업자육성 (TIPS) 추천 심사', period: '2024.05 - 2024.08', companies: 15, status: '대기', progress: 0 },
];

export default function ProjectsPage() {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const handleDetail = (project: any) => {
        setSelectedProject(project);
        setView('detail');
    };

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="list">
                        <ProjectListView onDetail={handleDetail} />
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="detail">
                        <ProjectDetailView project={selectedProject} onBack={() => setView('list')} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ProjectListView({ onDetail }: { onDetail: (p: any) => void }) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">사업 통합 관리</h2>
                    <p className="text-sm text-slate-500 mt-1">기관에서 운영 중인 모든 지원 사업 및 프로그램을 통합 관리합니다.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-11 px-6 shadow-lg shadow-indigo-100 flex items-center gap-2">
                    <Plus size={18} />
                    신규 사업 등록
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                    <Card key={project.id} className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group" onClick={() => onDetail(project)}>
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Briefcase size={20} />
                                </div>
                                <Badge className={`border-none font-bold text-[10px] px-2 py-0.5 rounded-lg ${
                                    project.status === '완료' ? 'bg-emerald-50 text-emerald-600' : 
                                    project.status === '진행중' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {project.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">{project.name}</h4>
                                <div className="flex items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Calendar size={14} />
                                        <span className="text-[12px] font-medium">{project.period}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Users size={14} />
                                        <span className="text-[12px] font-medium">{project.companies}개 기업</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-slate-400">진행률</span>
                                    <span className="text-[11px] font-black text-indigo-600">{project.progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.progress}%` }}
                                        className={`h-full ${project.status === '완료' ? 'bg-emerald-500' : 'bg-indigo-600'} rounded-full`}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function ProjectDetailView({ project, onBack }: { project: any, onBack: () => void }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{project.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">사업 상세 정보 및 개별 기업 관리 (2-Depth)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 border-none shadow-sm rounded-[24px] bg-indigo-600 text-white flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest">참여 기업 수</p>
                        <p className="text-2xl font-black">{project.companies}개사</p>
                    </div>
                </Card>
                <Card className="p-6 border-none shadow-sm rounded-[24px] bg-white border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">진단 완료 기업</p>
                        <p className="text-2xl font-black text-slate-800">42개사</p>
                    </div>
                </Card>
                <Card className="p-6 border-none shadow-sm rounded-[24px] bg-white border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">미작성 기업</p>
                        <p className="text-2xl font-black text-slate-800">18개사</p>
                    </div>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h4 className="font-bold text-slate-800">참여 기업 목록</h4>
                    <div className="flex items-center gap-2">
                         <Button variant="outline" className="rounded-xl h-9 text-[12px] font-bold">전체 진단 요청</Button>
                         <Button className="bg-indigo-600 text-white rounded-xl h-9 text-[12px] font-bold px-4">엑셀 다운로드</Button>
                    </div>
                </div>
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">기업명</th>
                                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">대표자</th>
                                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">진단 상태</th>
                                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider">평균 점수</th>
                                <th className="px-8 py-4 text-[11px] font-black text-slate-400 uppercase tracking-wider text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { name: '테크스타트업 (주)', CEO: '홍길동', status: '완료', score: 86 },
                                { name: '에코이노베이션', CEO: '김철수', status: '작성중', score: 65 },
                                { name: '핀테크코리아', CEO: '이영희', status: '대기', score: 0 },
                                { name: '로컬크리에이터랩', CEO: '박민준', status: '완료', score: 72 },
                            ].map((company, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5 font-bold text-slate-700 text-[14px]">{company.name}</td>
                                    <td className="px-8 py-5 text-slate-500 text-[13px]">{company.CEO}</td>
                                    <td className="px-8 py-5">
                                        <Badge className={`border-none font-bold text-[10px] ${
                                            company.status === '완료' ? 'bg-emerald-50 text-emerald-600' :
                                            company.status === '작성중' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {company.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-5 font-black text-slate-800 text-[15px]">{company.score > 0 ? company.score : '-'}</td>
                                    <td className="px-8 py-5 text-right">
                                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-indigo-600">
                                            <ExternalLink size={16} />
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
