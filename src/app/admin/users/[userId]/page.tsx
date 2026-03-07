'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ArrowLeft, Building2, Mail, Calendar, Target, Briefcase, FileText, CheckCircle2, AlertTriangle, Info, Trophy, Wrench, Edit, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const DIMENSION_LABELS: Record<string, string> = {
    D1: '경영전략/리더십',
    D2: '비즈니스 모델',
    D3: '조직/인사',
    D4: '마케팅/영업',
    D5: '기술/R&D',
    D6: '재무/자금',
    D7: '경영지원/ESG'
}

export default function UserDetailPage() {
    const params = useParams()
    const router = useRouter()
    const userId = params.userId as string

    const [userProfile, setUserProfile] = useState<any>(null)
    const [latestRecord, setLatestRecord] = useState<any>(null)
    const [memos, setMemos] = useState<any[]>([])
    const [newMemo, setNewMemo] = useState('')
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState<any>(null)

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return
            const supabase = createClient()

            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUser(user)

            // 1. Fetch Profile + Project info
            const { data: profile } = await supabase
                .from('profiles')
                .select('*, projects(name), groups(name)')
                .eq('id', userId)
                .single()

            if (!profile) {
                router.push('/admin/users')
                return
            }
            setUserProfile(profile)

            // 2. Fetch Latest Diagnosis
            const { data: records } = await supabase
                .from('diagnosis_records')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1)

            if (records && records.length > 0) {
                setLatestRecord(records[0])
            }

            // 3. Fetch Memos
            fetchMemos(supabase, userId)
        }

        fetchUserData()
    }, [userId, router])

    const fetchMemos = async (supabase: any, uid: string) => {
        const { data } = await supabase
            .from('mentoring_memos')
            .select('*, author:author_id(user_name, role)')
            .eq('company_id', uid)
            .order('created_at', { ascending: false })

        setMemos(data || [])
        setLoading(false)
    }

    const handleAddMemo = async () => {
        if (!newMemo.trim() || !currentUser) return

        const supabase = createClient()
        const { error } = await supabase
            .from('mentoring_memos')
            .insert({
                company_id: userId,
                author_id: currentUser.id,
                content: newMemo
            })

        if (!error) {
            setNewMemo('')
            fetchMemos(supabase, userId)
        } else {
            console.error(error)
            alert('메모 저장에 실패했습니다.')
        }
    }

    const handleDeleteMemo = async (memoId: string) => {
        if (!confirm('정말로 이 메모를 삭제하시겠습니까?')) return
        const supabase = createClient()
        const { error } = await supabase
            .from('mentoring_memos')
            .delete()
            .eq('id', memoId)

        if (!error) {
            setMemos(memos.filter(m => m.id !== memoId))
        }
    }

    if (loading) {
        return <div className="p-20 text-center animate-pulse text-slate-400">기업 정보를 불러오는 중입니다...</div>
    }

    if (!userProfile) return null

    // --- Helpers for Progress Bar UI ---
    const getProgressBarColor = (score: number) => {
        if (score >= 80) return 'bg-emerald-500'   // High
        if (score >= 60) return 'bg-amber-400'     // Mid
        return 'bg-rose-500'                       // Low
    }
    const getStatusIcon = (score: number) => {
        if (score >= 80) return <Trophy size={16} className="text-emerald-500 shrink-0" />
        if (score >= 60) return <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
        return <Wrench size={16} className="text-rose-500 shrink-0" />
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
            {/* Header - Compact Version */}
            <div className="dashboard-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin/users')} className="h-8 w-8 shrink-0 rounded-md text-slate-400 hover:bg-slate-100 mt-1 md:mt-0">
                        <ArrowLeft size={16} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                                {userProfile.company_name || '이름 없음'}
                            </h1>
                            {latestRecord && (
                                <div className="badge-compact bg-indigo-50 text-indigo-600">
                                    제출 완료
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 font-bold">
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase"><Mail size={12} /> {userProfile.email}</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-indigo-500 uppercase"><Briefcase size={12} /> {userProfile.projects?.name || '참여 사업 정보 없음'}</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase"><Building2 size={12} /> {userProfile.groups?.name || '일반 그룹'}</span>
                        </div>
                    </div>
                </div>
                {latestRecord && (
                    <div className="md:text-right bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 shrink-0">
                        <p className="label-text mb-0.5">종합 점수</p>
                        <div className="text-2xl font-black text-indigo-600">
                            {latestRecord.total_score || 0}<span className="text-[14px] text-slate-400 font-bold ml-1">점</span>
                        </div>
                    </div>
                )}
            </div>

            <Tabs defaultValue="diagnosis" className="w-full">
                <TabsList className="bg-transparent border-b border-slate-100 w-full justify-start h-auto rounded-none p-0 mb-6 gap-6">
                    <TabsTrigger 
                        value="diagnosis" 
                        className="font-bold gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent px-0 pb-3 text-[12px] uppercase tracking-wider"
                    >
                        <Target size={14} /> 진행 현황 & 진단 결과
                    </TabsTrigger>
                    <TabsTrigger 
                        value="memos" 
                        className="font-bold gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent px-0 pb-3 text-[12px] uppercase tracking-wider"
                    >
                        <FileText size={14} /> 멘토링 메모 자료
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="diagnosis" className="space-y-6 mt-0 outline-none">
                    {!latestRecord ? (
                        <div className="p-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                            <AlertTriangle size={40} className="text-slate-300 mb-4" />
                            <p className="font-medium text-lg text-slate-600">아직 진단을 진행하지 않은 기업입니다.</p>
                            <p className="text-sm mt-2">기업에 진단 참여를 독려해 주세요.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* 1. Progress Bar UI for D1-D7 */}
                            <div className="dashboard-card overflow-hidden">
                                <div className="border-b border-slate-50 bg-slate-50/20 p-4">
                                    <h3 className="font-bold text-slate-900 text-[14px] flex items-center gap-2 tracking-tight">
                                        <Target size={16} className="text-indigo-500" />
                                        진단 영역별 점수
                                    </h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    {Object.keys(DIMENSION_LABELS).map(key => {
                                        const score = latestRecord?.dimension_scores?.[key] || 0
                                        const colorClass = getProgressBarColor(score)
                                        return (
                                            <div key={key} className="space-y-1.5 group">
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <span className="font-bold text-slate-600 flex items-center gap-2 uppercase tracking-wide">
                                                        {DIMENSION_LABELS[key]}
                                                    </span>
                                                    <span className="font-black text-slate-900">{score}<span className="text-slate-400 text-[10px] ml-0.5 font-bold">점</span></span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass} shadow-sm shadow-current/10`}
                                                        style={{ width: `${score}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* 2. 3-Section Layout */}
                            <div className="dashboard-card overflow-hidden">
                                <div className="border-b border-slate-50 bg-slate-50/20 p-4">
                                    <h3 className="font-bold text-slate-900 text-[14px] flex items-center gap-2 tracking-tight">
                                        <FileText size={16} className="text-indigo-500" />
                                        전략적 분석 및 제언
                                    </h3>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {/* Section A: 현황 진단 */}
                                    <div className="p-4 space-y-2">
                                        <h4 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            진단 결과 분석
                                        </h4>
                                        <p className="text-[12px] text-slate-600 leading-relaxed bg-slate-50/50 rounded-md p-3 font-medium border border-slate-100/50">
                                            현재 {userProfile.company_name}의 비즈니스 모델은 시장 검증 단계에 진입하고 있으나, 정교한 조직 체계가 다소 부족한 상태입니다. 기술 R&D 역량이 우수하여 단기적인 성장 가능성이 매우 높게 평가됩니다.
                                        </p>
                                    </div>
                                    {/* Section B: 전문가 제언 */}
                                    <div className="p-4 space-y-2">
                                        <h4 className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                                            전문가 제언 및 핵심 해결 과제
                                        </h4>
                                        <p className="text-[12px] text-indigo-700 leading-relaxed bg-indigo-50/30 rounded-md p-3 font-medium border border-indigo-100/30">
                                            핵심 인력 유지를 위한 보상 체계(스톡옵션 등)의 공식화를 우선적으로 추진할 것을 권장합니다. 또한, 기관의 지속가능성 점수를 높이기 위해 내부 ESG 정책 수립을 고려해야 합니다.
                                        </p>
                                    </div>
                                    {/* Section C: 고유 용어 및 키워드 */}
                                    <div className="p-4 space-y-2">
                                        <h4 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            주요 키워드 / 용어 설명 (*)
                                        </h4>
                                        <ul className="text-[11px] text-slate-500 space-y-1 bg-slate-50/30 rounded-md p-3">
                                            <li className="flex items-start gap-2">
                                                <Info size={12} className="mt-0.5 shrink-0 text-slate-300" />
                                                <span><strong className="text-slate-700">스톡옵션:</strong> 핵심 인재를 확보하고 유지하기 위해 부여하는 주식 매수 선택권입니다.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="memos" className="mt-0 outline-none">
                    <div className="dashboard-card overflow-hidden">
                        <div className="border-b border-slate-50 bg-slate-50/20 p-4">
                            <h3 className="font-bold text-slate-900 text-[14px] flex items-center gap-2 tracking-tight">
                                <Edit size={16} className="text-indigo-500" />
                                멘토링 기록 및 메모 자료
                            </h3>
                        </div>
                        <div className="p-5">
                            {/* Write New Memo */}
                            <div className="mb-6">
                                <div className="border border-slate-200 bg-slate-50/30 rounded-lg p-1 focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
                                    <textarea
                                        rows={3}
                                        placeholder="기업 상담 내용이나 정성적 평가를 입력하세요..."
                                        className="w-full bg-transparent border-none outline-none resize-none p-3 text-[12px] font-medium text-slate-700 placeholder:text-slate-400"
                                        value={newMemo}
                                        onChange={(e) => setNewMemo(e.target.value)}
                                    />
                                    <div className="flex justify-end p-2 bg-white rounded-md border-t border-slate-100">
                                        <Button onClick={handleAddMemo} className="h-7 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] gap-2 shadow-sm rounded-md transition-all">
                                            <Plus size={14} /> 메모 저장
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Memo List */}
                            <div className="space-y-3">
                                {memos.length === 0 ? (
                                    <p className="text-center text-slate-300 text-[11px] py-10 font-bold uppercase tracking-wider">등록된 멘토링 메모가 없습니다.</p>
                                ) : (
                                    memos.map(memo => (
                                        <div key={memo.id} className="group relative bg-white p-4 border border-slate-100 rounded-lg shadow-sm hover:border-indigo-200 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                        {memo.author?.user_name?.charAt(0) || 'A'}
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-bold text-slate-900 leading-none">{memo.author?.user_name || 'Admin'}</p>
                                                        <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">{new Date(memo.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                {(currentUser?.id === memo.author_id || currentUser?.role === 'super_admin') && (
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMemo(memo.id)} className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-md">
                                                        <Trash2 size={13} />
                                                    </Button>
                                                )}
                                            </div>
                                            <p className="text-[12px] text-slate-600 font-medium whitespace-pre-wrap leading-relaxed">
                                                {memo.content}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
