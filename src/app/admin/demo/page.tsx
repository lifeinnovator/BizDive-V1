'use client';

import React from 'react';
import { 
    Users, 
    Briefcase, 
    ClipboardCheck, 
    LineChart, 
    TrendingUp, 
    ArrowUpRight,
    Building2,
    Calendar,
    ChevronRight,
    AlertCircle,
    FileSearch,
    Download,
    Filter,
    ArrowDownRight,
    CheckCircle2,
    Clock,
    Layout,
    FileEdit
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import DiagnosisRadarChart from '@/components/report/RadarChart';

// 현실적인 기관용 샘플 데이터
const MOCK_STATS = [
    { name: '관리 기업 수', value: '142', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50', change: '+12%', isUp: true },
    { name: '활성 프로그램', value: '4', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50', change: '신규 1건', isUp: true },
    { name: '누적 진단 건수', value: '1,284', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50', change: '+86', isUp: true },
    { name: '기관 전체 평균', value: '72.8', icon: LineChart, color: 'text-emerald-600', bg: 'bg-emerald-50', change: '+2.4', isUp: true },
];

const RECENT_ACTIVITIES = [
    { company: '테크스타트업 (주)', action: '심층 진단 보고서 검토 요청', time: '10분 전', score: 86, type: 'review' },
    { company: '에코이노베이션', action: '진단 설문 제출 완료', time: '1시간 전', score: 65, type: 'submit' },
    { company: '핀테크코리아', action: '신규 기업 온보딩 완료', time: '3시간 전', score: null, type: 'onboarding' },
    { company: '로컬크리에이터랩', action: '전문가 매칭 신청', time: '5시간 전', score: 72, type: 'match' },
    { company: '바이오네트웍스', action: '성장 지표 업데이트', time: '어제', score: 91, type: 'update' },
];

const PROJECT_STATS = [
    { name: '2024 창업성장기술개발(디딤돌) 과제', total: 60, current: 42, avg: 74.5, status: '진행중' },
    { name: '청년창업사관학교 14기 육성사업', total: 80, current: 76, avg: 68.2, status: '진행중' },
    { name: '글로벌 액셀러레이팅 프로그램 (GAPS)', total: 30, current: 30, avg: 82.9, status: '완료' },
    { name: '민관공동창업자육성 (TIPS) 추천 심사', total: 15, current: 8, avg: 88.4, status: '진행중' },
];

const INSTITUTION_AVG_SCORES = {
    D1: 78,
    D2: 72,
    D3: 65,
    D4: 81,
    D5: 68,
    D6: 74,
    D7: 70
};

const COMPARISON_SCORES = {
    D1: 65,
    D2: 60,
    D3: 58,
    D4: 70,
    D5: 62,
    D6: 64,
    D7: 60
};

export default function AdminDemoDashboard() {
    return (
        <div className="space-y-8 pb-10">
            {/* Demo Notice Banner */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-900 border border-indigo-800 rounded-3xl p-5 flex items-center justify-between shadow-2xl shadow-indigo-200 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="flex items-start gap-4 relative z-10">
                    <div className="p-2.5 bg-indigo-500/20 backdrop-blur-md rounded-2xl border border-white/10 text-white">
                        <AlertCircle size={22} />
                    </div>
                    <div>
                        <h4 className="text-[15px] font-bold text-white tracking-tight">기관 전용 관리자 데모 모드 (BizDive Admin Demo)</h4>
                        <p className="text-[12px] text-indigo-100/70 mt-1 font-medium leading-relaxed">
                            현재 보고 계신 화면은 지원기관 전용 관리 솔루션의 시각적 체험을 위한 데모 버전입니다. <br/>
                            실제 데이터 기반의 프로그램 운영 및 기업 관리는 정식 계정에서 가능합니다.
                        </p>
                    </div>
                </div>
                <div className="hidden lg:flex items-center gap-2 relative z-10">
                    <Button variant="outline" className="h-10 text-[12px] font-bold bg-white/5 border-white/10 text-white hover:bg-white hover:text-indigo-900 transition-all rounded-xl">
                        매뉴얼 확인
                    </Button>
                    <Button className="h-10 text-[12px] font-bold bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl shadow-lg shadow-indigo-950/20 transition-all border border-indigo-400/30">
                        기능 제안하기
                    </Button>
                </div>
            </motion.div>

            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-2 h-5">LIVE</Badge>
                        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">기관 통합 관제 대시보드</h2>
                    </div>
                    <p className="text-[14px] text-slate-400 font-medium">관리 중인 4개 프로그램과 142개 기업의 진단 지표가 실시간으로 집계됩니다.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-11 px-5 border-slate-200 text-slate-600 font-bold rounded-2xl bg-white shadow-sm flex items-center gap-2">
                        <Download size={16} />
                        리포트 내보내기
                    </Button>
                    <Button className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 flex items-center gap-2 transition-all">
                        <Calendar size={16} />
                        프로젝트 기준 설정
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {MOCK_STATS.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-all group-hover:rotate-12`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                                {stat.isUp ? <ArrowUpRight size={12} /> : <TrendingUp size={12} />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-[13px] font-bold text-slate-400/80 uppercase tracking-wider">{stat.name}</p>
                        <h3 className="text-3xl font-black text-slate-800 mt-1.5 tabular-nums">
                            {stat.value}
                            {stat.name.includes('점') ? <span className="text-sm font-bold ml-1 text-slate-400">PT</span> : 
                             stat.name.includes('수') ? <span className="text-sm font-bold ml-1 text-slate-400">{stat.name.includes('기업') ? '개' : '건'}</span> : ''}
                        </h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Distribution Chart */}
                <Card className="lg:col-span-2 border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-50 pb-6 pt-8 px-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2.5">
                                    <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                    소속 기업 역량 평균 분포
                                </CardTitle>
                                <p className="text-sm text-slate-400 mt-2 font-medium">
                                    기관 전체 평균과 타 지원사업 평균 데이터를 비교한 결과입니다.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 px-2 py-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>
                                    <span className="text-[11px] font-bold text-slate-600 uppercase">Our Average</span>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                                    <span className="text-[11px] font-bold text-slate-400 uppercase">Market Benchmark</span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-10 py-12 flex items-center justify-center">
                        <div className="w-full max-w-[500px]">
                            <DiagnosisRadarChart 
                                sectionScores={INSTITUTION_AVG_SCORES} 
                                previousScores={COMPARISON_SCORES} 
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Performance Insights */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white p-6">
                        <h4 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <TrendingUp size={18} className="text-emerald-500" />
                            영역별 리포트 요약
                        </h4>
                        <div className="space-y-5">
                            {[
                                { label: '강점 영역', value: '실행 역량 (D4)', score: 81, color: 'emerald' },
                                { label: '보완 영역', value: '해결 가치 (D3)', score: 65, color: 'rose' },
                                { label: '성장 가속도', value: '기술 구현 (D5)', score: 68, color: 'indigo' },
                            ].map((insight) => (
                                <div key={insight.label} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{insight.label}</span>
                                        <span className={`text-[12px] font-black text-${insight.color}-600`}>{insight.score}pt</span>
                                    </div>
                                    <div className="text-[13px] font-bold text-slate-700">{insight.value}</div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-indigo-600 p-8 text-white relative group cursor-pointer">
                        <Link href="/admin/demo/reports">
                            <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-110 transition-transform">
                                <FileSearch size={80} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-[13px] font-bold text-indigo-200 uppercase tracking-widest mb-2">Insight Recommendation</h4>
                                <p className="text-[16px] font-bold leading-snug mb-6">
                                    '해결 가치' 영역의 평균 점수가 전월 대비 15% 하락했습니다. 해당 영역 보완을 위한 멘토링 프로그램 편성을 추천합니다.
                                </p>
                                <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-2xl h-12 shadow-lg shadow-indigo-900/20">
                                    결과 보고서 작성하기 (2-Depth)
                                </Button>
                            </div>
                        </Link>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Programs */}
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-50 pt-8 pb-5 px-10">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
                                <Briefcase size={20} className="text-indigo-600" />
                                진행 중인 지원 사업
                            </CardTitle>
                            <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-indigo-600 p-0 h-auto">
                                전체 보기
                            </Button>
                        </div>
                    </CardHeader>
                    <div className="p-2">
                        {PROJECT_STATS.map((project, i) => (
                            <Link key={i} href="/admin/demo/projects">
                                <div className="px-8 py-5 hover:bg-slate-50 transition-all cursor-pointer group flex items-center justify-between rounded-[24px]">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[14px] font-bold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
                                                {project.name}
                                            </span>
                                            {project.status === '완료' && <CheckCircle2 size={14} className="text-emerald-500" />}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 max-w-[120px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${project.status === '완료' ? 'bg-emerald-500' : 'bg-indigo-600'} rounded-full`} 
                                                    style={{ width: `${(project.current / project.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-400">{project.current} / {project.total}개 기업 완료</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-6 sm:ml-12 min-w-[70px] justify-end">
                                        <div className="text-right">
                                            <div className="text-[16px] font-black text-slate-800">{project.avg}</div>
                                            <div className="text-[9px] font-bold text-slate-300 uppercase leading-none">Avg Score</div>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-200 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* Real-time Activity Feed */}
                <Card className="border-none shadow-sm rounded-[32px] overflow-hidden bg-white">
                    <CardHeader className="border-b border-slate-50 pt-8 pb-5 px-10">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
                                <Clock size={20} className="text-indigo-600" />
                                실시간 활동 피드
                            </CardTitle>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 rounded-full">
                                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                                <span className="text-[10px] font-bold text-rose-600">NEW EVENTS</span>
                            </div>
                        </div>
                    </CardHeader>
                    <div className="divide-y divide-slate-50 p-2">
                        {RECENT_ACTIVITIES.map((activity, i) => (
                            <div key={i} className="px-8 py-5 hover:bg-slate-50 transition-all cursor-pointer group rounded-[24px]">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                                            activity.type === 'review' ? 'bg-indigo-50 text-indigo-600' :
                                            activity.type === 'submit' ? 'bg-emerald-50 text-emerald-600' :
                                            activity.type === 'match' ? 'bg-purple-50 text-purple-600' : 'bg-slate-50 text-slate-400'
                                        }`}>
                                            {activity.type === 'review' ? <FileSearch size={18} /> :
                                             activity.type === 'submit' ? <ClipboardCheck size={18} /> :
                                             activity.type === 'match' ? <Users size={18} /> : <Building2 size={18} />}
                                        </div>
                                        <div className="min-w-0">
                                            <h5 className="text-[13px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                {activity.company}
                                            </h5>
                                            <p className="text-[12px] text-slate-500 font-medium mt-0.5">{activity.action}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-[11px] font-bold text-slate-400 mb-1">{activity.time}</div>
                                        {activity.score && (
                                            <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[10px] h-5">
                                                {activity.score}pt
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
