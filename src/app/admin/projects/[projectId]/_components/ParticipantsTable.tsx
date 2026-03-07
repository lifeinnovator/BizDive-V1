'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Building2, CheckCircle2, Circle, Link as LinkIcon, ExternalLink, Copy } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface ParticipantsTableProps {
    projectId: string
    projectRound?: number
}

export default function ParticipantsTable({ projectId, projectRound = 1 }: ParticipantsTableProps) {
    const [participants, setParticipants] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [projectDetails, setProjectDetails] = useState<any>(null)
    const [sendingEmailId, setSendingEmailId] = useState<string | null>(null)
    const [filter, setFilter] = useState<'all' | 'unresponded' | 'low_score'>('all')

    useEffect(() => {
        const fetchParticipants = async () => {
            const supabase = createClient()

            // 1. Fetch profiles belonging to this project
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false })

            if (error) {
                console.error("Error fetching participants:", error)
                setLoading(false)
                return
            }

            if (!profiles || profiles.length === 0) {
                setParticipants([])
                setLoading(false)
                return
            }

            // 2. Fetch diagnosis records for these users to determine completion status for the SPECIFIC ROUND
            const userIds = profiles.map(p => p.id)
            const { data: recordsData } = await supabase
                .from('diagnosis_records')
                .select('user_id, created_at, total_score')
                .in('user_id', userIds)
                .eq('round', projectRound)
                .eq('project_id', projectId)

            // Map records to profiles
            const merged = profiles.map(p => {
                const userRecords = recordsData?.filter(r => r.user_id === p.id) || []
                return {
                    ...p,
                    diagnosisCount: userRecords.length,
                    latestRecord: userRecords.length > 0
                        ? userRecords.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
                        : null
                }
            })

            // 3. Fetch project details for email context
            const { data: projectData } = await supabase
                .from('projects')
                .select('name')
                .eq('id', projectId)
                .single()
            if (projectData) {
                setProjectDetails(projectData)
            }

            setParticipants(merged)
            setLoading(false)
        }

        if (projectId) {
            fetchParticipants()
        }
    }, [projectId, projectRound])

    const copyMagicLink = (token: string, companyName: string) => {
        if (!token) {
            alert('매직 링크 토큰이 없습니다. 관리자에게 문의하세요.');
            return;
        }
        // In a real app, this would be the actual domain
        const baseUrl = window.location.origin;
        const magicLink = `${baseUrl}/diagnosis?token=${token}&round=${projectRound}`;

        navigator.clipboard.writeText(magicLink).then(() => {
            alert(`${companyName}의 ${projectRound}차 진단 전용 링크가 복사되었습니다.\n\n${magicLink}`);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('링크 복사에 실패했습니다.');
        });
    }

    const sendReminderEmail = async (participant: any) => {
        if (!participant.email || !participant.magic_link_token) {
            toast.error('메일 주소 또는 매직 링크가 없습니다.')
            return;
        }

        setSendingEmailId(participant.id);
        const baseUrl = window.location.origin;
        const magicLink = `${baseUrl}/diagnosis?token=${participant.magic_link_token}&round=${projectRound}`;

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: participant.email,
                    companyName: participant.company_name || '기업',
                    projectName: projectDetails?.name || '지원사업',
                    projectRound: projectRound,
                    magicLink: magicLink
                })
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(`${participant.company_name} 담당자에게 리마인드 메일을 발송했습니다.`)
            } else {
                throw new Error(data.error || '발송 실패');
            }
        } catch (error: any) {
            console.error('Mail error:', error);
            toast.error(`메일 발송 실패: ${error.message}`)
        } finally {
            setSendingEmailId(null);
        }
    }

    const sendBatchReminders = async () => {
        const unprotectedParticipants = participants.filter(p => p.diagnosisCount === 0);

        if (unprotectedParticipants.length === 0) {
            toast.info('미제출 기업이 없습니다.');
            return;
        }

        if (!confirm(`${unprotectedParticipants.length}개 기업에 독려 메일을 일괄 발송하시겠습니까?`)) {
            return;
        }

        toast.loading(`${unprotectedParticipants.length}개 기업에 메일을 발급/발송 중입니다...`, { id: 'batch-email' });

        let successCount = 0;
        let failCount = 0;

        for (const p of unprotectedParticipants) {
            try {
                const baseUrl = window.location.origin;
                const magicLink = `${baseUrl}/diagnosis?token=${p.magic_link_token}&round=${projectRound}`;

                const res = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: p.email,
                        companyName: p.company_name || '기업',
                        projectName: projectDetails?.name || '지원사업',
                        projectRound: projectRound,
                        magicLink: magicLink
                    })
                });
                if (res.ok) successCount++;
                else failCount++;
            } catch (err) {
                failCount++;
            }
        }

        toast.dismiss('batch-email');
        toast.success(`일괄 발송 완료: 성공 ${successCount}건, 실패 ${failCount}건`);
    }

    if (loading) {
        return <div className="p-10 text-center text-slate-400 font-medium">참여 기업을 불러오는 중...</div>
    }

    return (
        <div className="dashboard-card overflow-hidden animate-in fade-in duration-500">
            {/* Table Header - Compact Version */}
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-slate-50 bg-slate-50/20 gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
                        <h3 className="font-bold text-slate-900 text-[14px] tracking-tight">
                            참여 기업 목록
                        </h3>
                        <div className="badge-compact bg-indigo-50 text-indigo-600 ml-1">
                            총 {participants.length}개 기업
                        </div>
                    </div>

                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-0.5 ml-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setFilter('all')}
                            className={`h-6 text-[10px] font-bold px-3 rounded-sm ${filter === 'all' ? 'bg-slate-900 text-white active-nav-shadow' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            전체
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setFilter('unresponded')}
                            className={`h-6 text-[10px] font-bold px-3 rounded-sm ${filter === 'unresponded' ? 'bg-amber-500 text-white active-nav-shadow' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            미제출
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setFilter('low_score')}
                            className={`h-6 text-[10px] font-bold px-3 rounded-sm ${filter === 'low_score' ? 'bg-rose-500 text-white active-nav-shadow' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            저득점
                        </Button>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={sendBatchReminders}
                        className="h-8 text-[11px] font-bold text-slate-600 hover:text-indigo-600 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 px-3 flex gap-1.5"
                    >
                        <Mail size={13} />
                        일괄 독려 메일 발송
                    </Button>
                </div>
            </div>

            {participants.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-slate-50/10">
                    <Building2 size={24} className="mx-auto text-slate-200 mb-3 opacity-50" />
                    <p className="font-medium text-xs">이 사업에 등록된 참여 기업이 없습니다.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 bg-slate-50/30">
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[40%]">기업 정보</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">진행 상태</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">최근 점수</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {participants
                                .filter(p => {
                                    if (filter === 'unresponded') return p.diagnosisCount === 0;
                                    if (filter === 'low_score') return p.diagnosisCount > 0 && (p.latestRecord?.total_score || 0) < 60;
                                    return true;
                                })
                                .map((p) => {
                                    const score = p.latestRecord?.total_score || 0;
                                    const scoreColor = score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-indigo-500' : 'text-rose-500';
                                    
                                    return (
                                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                                        <Building2 size={16} />
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <p className="text-[12px] font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                                            {p.company_name || '회사명 미기재'}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 font-medium line-clamp-1">
                                                            {p.user_name || '담당자 미기재'} • {p.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-center">
                                                {p.diagnosisCount > 0 ? (
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                                                        <span className="text-[10px] font-bold text-emerald-600">제출 완료</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <div className="w-1 h-1 rounded-full bg-amber-400"></div>
                                                        <span className="text-[10px] font-bold text-amber-500">미제출</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 text-center">
                                                {p.diagnosisCount > 0 ? (
                                                    <span className={`text-[12px] font-bold ${scoreColor}`}>
                                                        {score}<span className="text-[9px] opacity-60 ml-0.5">PT</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-[11px] font-medium text-slate-300">-</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => copyMagicLink(p.magic_link_token, p.company_name)}
                                                        className="h-7 w-7 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                                                        title="전용 링크 복사"
                                                    >
                                                        <LinkIcon size={13} />
                                                    </Button>
                                                    <Link href={`/admin/users/${p.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-100">
                                                            <ExternalLink size={13} />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
