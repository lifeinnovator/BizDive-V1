'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, Settings, Bell, Shield, Palette, Save, HelpCircle } from 'lucide-react'

export default function DemoSettingsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Demo Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 w-full">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
                <div className="flex-1">
                    <p className="text-amber-800 text-sm font-semibold">
                        설정 데모 화면입니다.
                    </p>
                    <p className="text-amber-700/80 text-xs mt-0.5">
                        설정 변경 사항은 저장되지 않으며 실제 서비스에 영향을 주지 않습니다.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">설정</h1>
                    <p className="text-slate-500 mt-1 font-medium">플랫폼 운영 환경과 관리자 권한을 구성합니다.</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-indigo-100 flex items-center gap-2">
                    <Save size={18} /> 변경사항 저장
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-white border border-slate-100 p-1 rounded-2xl mb-8">
                    <TabsTrigger value="general" className="rounded-xl font-bold px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">일반 설정</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl font-bold px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">보안/권한</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-xl font-bold px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">알림 설정</TabsTrigger>
                    <TabsTrigger value="branding" className="rounded-xl font-bold px-6 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">브랜딩</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-none shadow-sm bg-white overflow-hidden text-slate-900">
                            <CardHeader className="border-b border-slate-50">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <Palette size={20} className="text-indigo-600" />
                                    플랫폼 정보
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase mb-2 block">플랫폼 공식 명칭</label>
                                    <input
                                        type="text"
                                        defaultValue="BizDive"
                                        className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-slate-400 uppercase mb-2 block">관리자 지원 이메일</label>
                                    <input
                                        type="email"
                                        defaultValue="support@bizdive.com"
                                        className="w-full p-3 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm bg-white overflow-hidden text-slate-900">
                            <CardHeader className="border-b border-slate-50">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <HelpCircle size={20} className="text-indigo-600" />
                                    도움말 및 가이드
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                                    관리자 매뉴얼과 기능 가이드를 확인하여 BizDive 플랫폼을 더 효과적으로 운영해 보세요.
                                </p>
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full justify-between rounded-xl font-bold text-slate-600">
                                        관리자 가이드 다운로드 (PDF)
                                        <Save size={16} />
                                    </Button>
                                    <Button variant="outline" className="w-full justify-between rounded-xl font-bold text-slate-600">
                                        기능 업데이트 노트
                                        <Bell size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="border-none shadow-sm bg-white overflow-hidden text-slate-900">
                        <CardHeader className="border-b border-slate-50">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                                <Shield size={20} className="text-indigo-600" />
                                보안 설정 현황
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
                                <Shield size={40} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-2">보안 설정 데모</h3>
                            <p className="text-slate-500 font-medium max-w-sm mb-8">
                                2단계 인증, IP 접근 제한, 개인정보 열람 로그 등 기업 보안을 위한 고급 설정 기능을 정식 버전에서 만나보세요.
                            </p>
                            <Button className="bg-indigo-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-indigo-100">
                                정식 서비스 문의하기
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
