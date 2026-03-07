'use client'

import React from 'react'
import {
    User,
    Shield,
    Bell,
    Smartphone,
    Settings as SettingsIcon,
    LogOut,
    ChevronRight,
    Globe,
    Database,
    Lock,
    Mail
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section - Compact */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">시스템 설정</h1>
                    <p className="text-slate-400 mt-1 font-medium text-[11px]">관리자 프로필 및 플랫폼 환경설정을 관리합니다.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Aspect: Profile */}
                <div className="space-y-6">
                    <div className="dashboard-card overflow-hidden">
                        <div className="h-16 bg-slate-800" />
                        <CardContent className="px-5 pb-6 text-center -mt-8">
                            <div className="inline-block p-1 bg-white rounded-lg shadow-sm mb-3">
                                <div className="w-16 h-16 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                    <User size={32} />
                                </div>
                            </div>
                            <h3 className="text-md font-bold text-slate-900">최고 관리자</h3>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">플랫폼 소유자</p>
                            <div className="flex items-center justify-center gap-1.5 mt-3 text-slate-400">
                                <Mail size={12} />
                                <span className="text-[11px] font-bold">admin@bizdive.kr</span>
                            </div>
                            <Button variant="outline" className="w-full mt-6 h-8 text-[11px] font-bold border-slate-200 rounded-lg shadow-sm">
                                프로필 수정
                            </Button>
                        </CardContent>
                    </div>

                    <div className="dashboard-card bg-slate-900 text-white p-4">
                        <div className="flex items-start gap-4">
                            <Shield className="text-indigo-400 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-bold text-white text-[12px] uppercase">보안 상태: 최적화됨</h4>
                                <p className="text-indigo-300 text-[10px] mt-1.5 leading-relaxed font-medium">
                                    마지막 비밀번호 변경: 12일 전<br />
                                    2단계 인증(2FA) 활성화됨
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Aspect: Settings Sections */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card overflow-hidden">
                        <div className="border-b border-slate-50 bg-slate-50/20 p-4">
                            <h3 className="font-bold text-slate-900 text-[14px] flex items-center gap-2 tracking-tight">
                                <SettingsIcon size={16} className="text-indigo-600" />
                                핵심 환경 설정
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {[
                                { icon: Bell, label: '알림 설정', desc: '진단 및 가입 알림 관리', color: 'text-blue-500', bg: 'bg-blue-50' },
                                { icon: Smartphone, label: '모바일 연결', desc: '푸시 토큰 및 모바일 UI 설정', color: 'text-purple-500', bg: 'bg-purple-50' },
                                { icon: Globe, label: '플랫폼 정보', desc: '이용약관 및 개인정보처리방침 관리', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                { icon: Database, label: '데이터 정합성', desc: '자동 데이터베이스 백업 루틴', color: 'text-amber-500', bg: 'bg-amber-50' },
                            ].map((item, idx) => (
                                <div key={idx} className="p-4 hover:bg-slate-50/50 transition-all flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${item.bg} ${item.color} group-hover:bg-white group-hover:shadow-sm transition-all`}>
                                            <item.icon size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[12px] font-bold text-slate-800">{item.label}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{item.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dashboard-card overflow-hidden">
                        <div className="border-b border-slate-50 bg-slate-50/20 p-4">
                            <h3 className="font-bold text-slate-900 text-[14px] flex items-center gap-2 tracking-tight">
                                <Lock size={16} className="text-rose-500" />
                                인프라 보안 관리
                            </h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-800 uppercase">세션 관리</p>
                                    <p className="text-[10px] text-slate-400 font-medium">다른 모든 활성 브라우저 세션을 종료합니다.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 px-3 bg-white border-slate-200 text-[10px] font-bold uppercase hover:bg-slate-50 shadow-sm">모든 기기 로그아웃</Button>
                            </div>
                            <Button variant="ghost" className="w-full text-rose-500 hover:bg-rose-50 hover:text-rose-600 font-bold text-[12px] uppercase gap-2 h-10 rounded-lg transition-all">
                                <LogOut size={16} />
                                관리자 세션 종료
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
