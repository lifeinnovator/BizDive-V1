'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Briefcase, Calendar, ClipboardCheck, ArrowUpRight, Search, Plus, Filter, MessageSquare } from 'lucide-react'

const MOCK_PROJECTS = [
    {
        id: 1,
        name: '2026 스타트업 가치 진단 프로젝트',
        group: '청년창업 사관학교',
        status: 'ongoing',
        participants: 120,
        completed: 85,
        deadline: '2026-06-30',
        progress: 71
    },
    {
        id: 2,
        name: '글로벌 엑셀러레이팅 G-Step 1',
        group: '실리콘밸리 연수팀',
        status: 'ongoing',
        participants: 24,
        completed: 12,
        deadline: '2026-04-15',
        progress: 50
    },
    {
        id: 3,
        name: '2025 초기창업패키지 성과 보고',
        group: '비즈다이브 기초진단',
        status: 'closed',
        participants: 250,
        completed: 248,
        deadline: '2025-12-20',
        progress: 99
    },
]

export default function DemoProjectsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Demo Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 w-full">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
                <div className="flex-1">
                    <p className="text-amber-800 text-sm font-semibold">
                        사업 관리 데모 화면입니다.
                    </p>
                    <p className="text-amber-700/80 text-xs mt-0.5">
                        임의로 구성된 프로젝트 목록이며, 실제 기능은 동작하지 않습니다.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">사업 관리</h1>
                    <p className="text-slate-500 mt-1 font-medium">운영 중인 진단 사업과 프로젝트의 현황을 추적하세요.</p>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-slate-200 flex items-center gap-2">
                    <Plus size={18} /> 새 사업 공고
                </Button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: '활성 프로젝트', value: '8개', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: '평균 응답률', value: '74.2%', icon: ClipboardCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: '대기 중인 피드백', value: '12건', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 mb-0.5">{stat.label}</p>
                                <p className="text-xl font-black text-slate-900">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Project List */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-slate-900">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="font-black text-lg text-slate-800">전체 프로젝트 목록</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="사업명 검색..."
                                className="pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-xs w-48 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="rounded-lg border-slate-200 h-8 text-xs font-bold gap-1">
                            <Filter size={14} /> 필터
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                                <th className="px-6 py-4">사업명 / 관리 그룹</th>
                                <th className="px-6 py-4">상태</th>
                                <th className="px-6 py-4">참여도 (완료/전체)</th>
                                <th className="px-6 py-4">마감일</th>
                                <th className="px-6 py-4 text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {MOCK_PROJECTS.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{project.name}</p>
                                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{project.group}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        {project.status === 'ongoing' ? (
                                            <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold text-[10px]">진행 중</Badge>
                                        ) : (
                                            <Badge className="bg-slate-100 text-slate-400 border-none font-bold text-[10px]">종료</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="w-32 h-1.5 bg-slate-100 rounded-full mb-1.5 overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-500 rounded-full"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-500">
                                            {project.completed} / {project.participants} <span className="text-slate-300 ml-1">({project.progress}%)</span>
                                        </p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                            <Calendar size={14} />
                                            {project.deadline}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 text-slate-400">
                                            <ArrowUpRight size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
