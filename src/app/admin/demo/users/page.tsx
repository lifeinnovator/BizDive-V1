'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, User, Mail, ShieldCheck, Search, Filter, MoreHorizontal, UserPlus } from 'lucide-react'

const MOCK_USERS = [
    { id: 1, name: '김철수', email: 'chulsoo@bizdive.com', company: '비즈다이브랩', role: '최고 관리자', status: 'active', lastLogin: '10분 전' },
    { id: 2, name: '이영희', email: 'younghee@example.com', company: '그로스랩', role: '그룹 관리자', status: 'active', lastLogin: '2시간 전' },
    { id: 3, name: '박지민', email: 'jimin.park@partner.com', company: '혁신 파트너스', role: '기업 매니저', status: 'inactive', lastLogin: '3일 전' },
    { id: 4, name: '최동욱', email: 'dw.choi@startup.io', company: '에이아이테크', role: '기업 매니저', status: 'active', lastLogin: '1일 전' },
    { id: 5, name: '정지우', email: 'jiwoo.jung@venture.co', company: '벤처스퀘어', role: '그룹 관리자', status: 'active', lastLogin: '5시간 전' },
]

export default function DemoUsersPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Demo Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 w-full">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
                <div className="flex-1">
                    <p className="text-amber-800 text-sm font-semibold">
                        사용자 관리 데모 화면입니다.
                    </p>
                    <p className="text-amber-700/80 text-xs mt-0.5">
                        실제 계정 정보가 아닌 테스트용 샘플 데이터입니다.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">사용자 관리</h1>
                    <p className="text-slate-500 mt-1 font-medium">플랫폼 이용자들의 권한과 상태를 관리합니다.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2">
                    <UserPlus size={18} /> 유저 초대
                </Button>
            </div>

            {/* Content Card with List */}
            <Card className="border-none shadow-sm bg-white overflow-hidden text-slate-900">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="이름, 이메일, 기업 검색..."
                                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl border-slate-200 h-9 text-xs font-bold gap-1">
                            <Filter size={14} /> 상세 필터
                        </Button>
                    </div>
                    <p className="text-xs font-bold text-slate-400">총 {MOCK_USERS.length}명의 사용자</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                                <th className="px-6 py-4">사용자 정보</th>
                                <th className="px-6 py-4">소속 / 역할</th>
                                <th className="px-6 py-4">상태</th>
                                <th className="px-6 py-4">최근 활동</th>
                                <th className="px-6 py-4 text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {MOCK_USERS.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">{user.name}</p>
                                                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                                                    <Mail size={10} /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-800">{user.company}</p>
                                        <div className="flex items-center gap-1 mt-0.5 text-indigo-600 font-bold text-[10px]">
                                            <ShieldCheck size={12} /> {user.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.status === 'active' ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                <span className="text-xs font-bold">활성</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                <span className="text-xs font-bold">비활성</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 font-medium">{user.lastLogin}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={18} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
