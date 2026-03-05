'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Building2, Users, Search, Plus, MoreVertical, ExternalLink } from 'lucide-react'

const MOCK_GROUPS = [
    { id: 1, name: '혁신 스타트업 실리콘밸리 연수팀', type: '프로그램그룹', companies: 8, members: 12, status: 'active', createdAt: '2026-01-15' },
    { id: 2, name: '2026 청년창업 사관학교 16기', type: '공공기관', companies: 45, members: 82, status: 'active', createdAt: '2026-02-01' },
    { id: 3, name: '테크 액셀러레이터 배치 #4', type: '민간AC/VC', companies: 12, members: 24, status: 'completed', createdAt: '2025-09-10' },
    { id: 4, name: '바이오 코리아 2026 선발팀', type: '프로그램그룹', companies: 15, members: 30, status: 'active', createdAt: '2026-02-20' },
]

export default function DemoGroupsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Demo Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 w-full">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
                <div className="flex-1">
                    <p className="text-amber-800 text-sm font-semibold">
                        기업/그룹 관리 데모 화면입니다.
                    </p>
                    <p className="text-amber-700/80 text-xs mt-0.5">
                        실제 데이터를 수정하거나 삭제할 수 없는 미리보기 모드입니다.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">기업/그룹 관리</h1>
                    <p className="text-slate-500 mt-1 font-medium">소속된 기업들과 그룹을 체계적으로 관리하세요.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2">
                    <Plus size={18} /> 새 그룹 생성
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="그룹명 또는 기업명 검색..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-bold h-10">필터</Button>
                    <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 font-bold h-10">엑셀 다운로드</Button>
                </div>
            </div>

            {/* Group Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {MOCK_GROUPS.map((group) => (
                    <Card key={group.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                        <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-slate-50">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-[10px] font-bold py-0 h-5 border-slate-200 text-slate-500">{group.type}</Badge>
                                    {group.status === 'active' ? (
                                        <Badge className="text-[10px] font-bold py-0 h-5 bg-emerald-50 text-emerald-600 border-none">운영중</Badge>
                                    ) : (
                                        <Badge className="text-[10px] font-bold py-0 h-5 bg-slate-100 text-slate-400 border-none">종료</Badge>
                                    )}
                                </div>
                                <CardTitle className="text-lg font-black text-slate-800">{group.name}</CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 rounded-full">
                                <MoreVertical size={18} />
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                                        <Building2 size={14} />
                                        <span className="text-xs font-bold">참여 기업</span>
                                    </div>
                                    <p className="text-xl font-black text-slate-900">{group.companies}개</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                                        <Users size={14} />
                                        <span className="text-xs font-bold">전체 멤버</span>
                                    </div>
                                    <p className="text-xl font-black text-slate-900">{group.members}명</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-400 font-medium">생성일: {group.createdAt}</span>
                                <Button variant="ghost" className="text-indigo-600 font-bold text-sm gap-1 hover:bg-indigo-50 h-9 px-3 rounded-lg">
                                    자세히 보기 <ExternalLink size={14} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
