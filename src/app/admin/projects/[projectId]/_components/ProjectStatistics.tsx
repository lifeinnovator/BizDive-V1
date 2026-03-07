'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { Users, FileText, TrendingUp, Presentation, AlertCircle } from 'lucide-react'
import ComparativeChart from '@/components/admin/ComparativeChart'

interface ProjectStatisticsProps {
    projectId: string
    projectRound?: number
}

// Mock Data for Demonstration
const MOCK_GROWTH_DATA = [
    { category: 'D1 경영전략', round1: 65, round2: 78 },
    { category: 'D2 제품/서비스', round1: 70, round2: 85 },
    { category: 'D3 비즈니스모델', round1: 55, round2: 68 },
    { category: 'D4 마케팅/영업', round1: 60, round2: 72 },
    { category: 'D5 조직/인사', round1: 50, round2: 65 },
    { category: 'D6 재무/투자', round1: 45, round2: 80 },
    { category: 'D7 리스크관리', round1: 50, round2: 74 }
]

const MOCK_TOTAL_SCORE_TREND = [
    { company: '알파 테크놀로지', before: 55, after: 74 },
    { company: '베타 솔루션즈', before: 62, after: 81 },
    { company: '감마 랩스', before: 48, after: 68 },
    { company: '델타 이노베이션', before: 71, after: 88 },
    { company: '엡실론 AI', before: 45, after: 72 }
]

export default function ProjectStatistics({ projectId, projectRound = 1 }: ProjectStatisticsProps) {
    const [stats, setStats] = useState({
        totalParticipants: 0,
        completedCount: 0,
        avgScore: 0,
        bizDiveAvg: 72.5,
        comparisonData: [] as any[],
        topGainers: [] as any[]
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch real stats from Supabase
        const fetchStats = async () => {
            const supabase = createClient()

            // 1. Get total participants
            const { count: totalUsers } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('project_id', projectId)

            // 2. Get diagnosis records for these participants
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id')
                .eq('project_id', projectId)

            let completed = 0;
            let sumScore = 0;

            if (profiles && profiles.length > 0) {
                const userIds = profiles.map((p: any) => p.id)
                const { data: records } = await supabase
                    .from('diagnosis_records')
                    .select('id, total_score')
                    .in('user_id', userIds)
                    .eq('project_id', projectId)
                    .eq('round', projectRound)

                if (records && records.length > 0) {
                    completed = records.length;
                    sumScore = records.reduce((acc: number, curr: any) => acc + (curr.total_score || 0), 0);
                }
            }

            // 3. Fetch data for Radar Comparison (Group Avg by Dimension)
            const getGroupAvgByDimension = async (roundNum: number) => {
                const { data } = await supabase
                    .from('diagnosis_records')
                    .select('dimension_scores')
                    .eq('project_id', projectId)
                    .eq('round', roundNum)

                if (!data || data.length === 0) return null

                const dimensionKeys = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7']
                const totals: Record<string, number> = {}
                dimensionKeys.forEach(k => totals[k] = 0)

                data.forEach(r => {
                    const scores = r.dimension_scores as any
                    dimensionKeys.forEach(k => {
                        totals[k] += scores[k] || 0
                    })
                })

                const avgs: Record<string, number> = {}
                dimensionKeys.forEach(k => {
                    avgs[k] = Math.round((totals[k] / data.length) * 10) / 10
                })
                return avgs
            }

            const currentAvgs = await getGroupAvgByDimension(projectRound)
            const prevAvgs = projectRound > 1 ? await getGroupAvgByDimension(projectRound - 1) : null

            const dimensionLabels: Record<string, string> = {
                D1: '시장분석', D2: '문제이해', D3: '해결가치', D4: '실행역량', D5: '기술역량', D6: '수익모델', D7: '성장전략'
            }

            const comparisonData = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'].map(k => ({
                category: dimensionLabels[k],
                current: currentAvgs ? currentAvgs[k] : 0,
                prev: prevAvgs ? prevAvgs[k] : 0
            }))

            setStats(prevStats => ({
                ...prevStats, // Keep existing bizDiveAvg
                totalParticipants: totalUsers || 0,
                completedCount: completed,
                avgScore: completed > 0 ? Math.round((sumScore / completed) * 10) / 10 : 0,
                comparisonData,
                topGainers: [] // Future implementation: can sort by improvement
            }))

            setLoading(false)
        }

        if (projectId) {
            fetchStats()
        }
    }, [projectId, projectRound])

    if (loading) {
        return <div className="p-10 text-center text-slate-400 font-medium">통계 데이터를 불러오는 중...</div>
    }

    const completionRate = stats.totalParticipants > 0
        ? Math.round((stats.completedCount / stats.totalParticipants) * 100)
        : 0;

    return (
        <div className="space-y-4">
            {/* Top Cards: Magic Dashboard Overview - Compact Version */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <div className="dashboard-card p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                        <p className="label-text">COMPANIES</p>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded-md">
                            <Users size={14} />
                        </div>
                    </div>
                    <div>
                        <h3 className="data-text">{stats.totalParticipants}<span className="text-[11px] font-medium ml-1 text-slate-400 tracking-normal">UNITS</span></h3>
                        <p className="meta-text mt-1 italic">Total managed</p>
                    </div>
                </div>

                <div className="dashboard-card p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                        <p className="label-text">COMPLETION</p>
                        <div className={`w-2 h-2 rounded-full ${completionRate >= 80 ? 'bg-emerald-400' : completionRate >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`} />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-1.5">
                            <h3 className="data-text">{completionRate}%</h3>
                            <span className="text-[10px] font-bold text-slate-300">({stats.completedCount}/{stats.totalParticipants})</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 mt-2 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-700 ${completionRate >= 80 ? 'bg-emerald-500' : completionRate >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                style={{ width: `${completionRate}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="dashboard-card p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                        <p className="label-text">AVG PERFORMANCE</p>
                        <div className="p-1.5 bg-slate-50 text-slate-400 rounded-md">
                            <TrendingUp size={14} />
                        </div>
                    </div>
                    <div>
                        <h3 className="data-text">{stats.avgScore}<span className="text-[11px] font-medium ml-1 text-slate-400 tracking-normal">PT</span></h3>
                        <p className="meta-text mt-1 italic text-indigo-500 font-bold">Current vs Previous</p>
                    </div>
                </div>

                <div className="dashboard-card p-4 flex flex-col justify-between bg-slate-900 border-none group">
                    <div className="flex items-center justify-between mb-3">
                        <p className="label-text text-slate-400">GLOBAL AVG</p>
                        <Presentation size={14} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <div>
                        <h3 className="data-text text-white">{stats.bizDiveAvg}<span className="text-[11px] font-medium ml-1 text-slate-600 tracking-normal">PT</span></h3>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className={`text-[10px] font-bold ${stats.avgScore > stats.bizDiveAvg ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {stats.avgScore > stats.bizDiveAvg ? 'OVER' : 'UNDER'} {Math.abs(stats.avgScore - stats.bizDiveAvg).toFixed(1)}pt
                            </span>
                            <span className="text-[10px] text-slate-600 font-bold">vs Benchmark</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section: Charts - Compact Version */}
            <div className="grid gap-4 md:grid-cols-2">
                <div className="dashboard-card overflow-hidden">
                    <ComparativeChart
                        data={stats.comparisonData.length > 0 ? stats.comparisonData : MOCK_GROWTH_DATA}
                        title="Dimension Capability Radar"
                        roundLabel1={projectRound > 1 ? `Round ${projectRound - 1}` : "Benchmark"}
                        roundLabel2={`Round ${projectRound}`}
                    />
                </div>

                <div className="dashboard-card p-5">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-[13px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emerald-400 rounded-full"></span>
                                Top Gainer Trends
                            </h4>
                            <p className="meta-text mt-0.5">Performance tracking for top 5 units</p>
                        </div>
                    </div>
                    <div className="h-[220px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOCK_TOTAL_SCORE_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis dataKey="company" hide />
                                <YAxis domain={[0, 100]} tick={{ fill: '#cbd5e1', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '11px', fontWeight: 700 }}
                                />
                                <Line type="monotone" name="Prev" dataKey="before" stroke="#f1f5f9" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                <Line type="monotone" name="Current" dataKey="after" stroke="#10b981" strokeWidth={3} dot={{ r: 3, fill: '#10b981' }} activeDot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs font-medium text-slate-400 mt-4 pb-10">
                * 상세 지표 라인 차트와 레이다 차트는 데이터가 충분히 누적되었을 때 실시간으로 정확히 반영됩니다. (현재 시연용 Mock 데이터 적용됨)
            </div>
        </div>
    )
}
