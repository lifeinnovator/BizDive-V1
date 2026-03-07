'use client'

import React from 'react'
import {
    Users,
    Briefcase,
    ClipboardCheck,
    LineChart,
    ChevronRight,
    Building2,
    Calendar,
    Mail,
    CheckCircle2,
    Circle,
    ArrowUpRight,
    TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AdminRadarChart from '@/components/admin/AdminRadarChart'
import ScoreIndicator from '@/components/admin/ScoreIndicator'
import Link from 'next/link'

interface InstitutionAdminDashboardProps {
    profile: any
    stats: {
        totalUsers: number
        totalRecords: number
        avgScore: number
        totalProjects: number
        recentActivities: any[]
        projectStats?: any[]
    }
    isDemo?: boolean
}

const COMPARISON_DATA = [
    { dimension: 'D1', full_name: '시장 분석', score: 0, benchmark: 70 },
    { dimension: 'D2', full_name: '문제 정의', score: 0, benchmark: 70 },
    { dimension: 'D3', full_name: '해결 가치', score: 0, benchmark: 70 },
    { dimension: 'D4', full_name: '실행 역량', score: 0, benchmark: 70 },
    { dimension: 'D5', full_name: '기술 역량', score: 0, benchmark: 70 },
    { dimension: 'D6', full_name: '수익 모델', score: 0, benchmark: 70 },
    { dimension: 'D7', full_name: '성장 전략', score: 0, benchmark: 70 },
]

export default function InstitutionAdminDashboard({ profile, stats, isDemo = false }: InstitutionAdminDashboardProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Institution Header - Compact Version */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden relative group/hero">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/40 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover/hero:scale-110 duration-700"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Badge className="bg-indigo-600 text-[10px] text-white border-none font-bold px-2 py-0">BIZDIVE 어드민</Badge>
                        <span className="text-slate-300 font-bold text-xs">/</span>
                        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">{profile?.group_name || 'BIZDIVE'}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        안녕하세요, <span className="text-indigo-600">{profile?.user_name || '관리자'}님</span>
                    </h1>
                    <p className="text-slate-500 mt-1 text-xs font-medium flex items-center gap-2 opacity-80">
                        진행 중인 프로젝트와 참여 기업의 성장 지표를 실시간으로 확인하세요.
                    </p>
                </div>
                <div className="flex gap-2 relative z-10">
                    <Link href={isDemo ? "/admin/demo/projects" : "/admin/projects"}>
                        <Button className="bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold px-4 h-10 rounded-lg shadow-sm">
                            <Briefcase size={14} className="mr-2" />
                            신규 프로젝트 개설
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Group Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { name: '관리 기업 수', value: stats.totalUsers, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { name: '진행 중인 사업', value: stats.totalProjects, icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { name: '전체 진단 건수', value: stats.totalRecords, icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { name: '기관 전체 평균', value: stats.avgScore, icon: LineChart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((item) => (
                    <div key={item.name} className="dashboard-card p-4 group hover:border-indigo-200 transition-all">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="label-text mb-1">{item.name}</p>
                                <h3 className="data-text">{item.value}</h3>
                            </div>
                            <div className={`p-2.5 rounded-lg ${item.bg} group-hover:scale-105 transition-transform`}>
                                <item.icon size={18} className={item.color} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Comparative Analysis */}
                <Card className="lg:col-span-2 border-none shadow-sm bg-white overflow-hidden">
                    <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between pb-4">
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-indigo-600" />
                                우리 기관 기업 분포 분석
                            </CardTitle>
                            <p className="text-xs text-slate-400 mt-1 font-medium">플랫폼 전체 평균(Benchmark) 대비 우리 기관 기업들의 강점/약점</p>
                        </div>
                        <ScoreIndicator score={stats.avgScore} />
                    </CardHeader>
                    <CardContent className="p-10 flex items-center justify-center min-h-[400px]">
                        {/* Note: AdminRadarChart needs update to handle benchmark, using standard for now */}
                        <AdminRadarChart data={COMPARISON_DATA} />
                    </CardContent>
                </Card>

                {/* Recent Activity in My Group */}
                <div className="dashboard-card">
                    <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-800">최근 활동 내역</h3>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0">실시간</Badge>
                    </div>
                    <div className="p-0">
                        <div className="divide-y divide-slate-50">
                            {stats.recentActivities.length > 0 ? stats.recentActivities.map((item, idx) => (
                                <div key={idx} className="px-5 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-[12px] font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                                            {item.company}
                                        </p>
                                        <span className="text-[10px] font-medium text-slate-400">{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-emerald-500 tracking-tight uppercase">제출 완료</span>
                                        <span className="text-[10px] text-slate-400 font-semibold shrink-0">• 점수: {item.score}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-10 text-center text-slate-400 font-medium text-[12px] italic">최근 활동 내역이 없습니다.</div>
                            )}
                        </div>
                        <div className="p-3 border-t border-slate-50">
                            <Button variant="ghost" className="w-full text-xs font-bold text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 h-9 rounded-lg transition-all">
                                전체 활동 보기 <ChevronRight size={12} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Stats (지원사업별 통계) - Compact Table */}
            <div className="dashboard-card">
                <div className="px-5 py-4 border-b border-slate-50 flex items-center gap-2">
                    <Briefcase size={16} className="text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-800">지원 사업별 통계</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left compact-table border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">프로젝트명</th>
                                <th className="px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">진단 현황</th>
                                <th className="px-5 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">평균 점수</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats.projectStats && stats.projectStats.length > 0 ? (
                                stats.projectStats.map((project: any) => (
                                    <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-5 py-3.5">
                                            <div className="font-bold text-slate-700 text-[12px] group-hover:text-indigo-600 transition-colors">{project.name}</div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(project.recordCount * 10, 100)}%` }}></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500">{project.recordCount}건</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <span className="text-[13px] font-bold text-slate-900">{project.avgScore}</span>
                                                <span className="text-[10px] text-slate-400 font-bold">PT</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-medium text-xs italic">
                                        활성 프로젝트 또는 진단 기록이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
