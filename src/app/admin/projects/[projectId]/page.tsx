'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { TrendingUp, AlertCircle, CheckCircle2, Circle, Mail, Building2, Calendar, ArrowLeft, BarChart3, Users, FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Subcomponents
import ParticipantsTable from './_components/ParticipantsTable'
import ProjectStatistics from './_components/ProjectStatistics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProjectDashboardPage() {
    const params = useParams()
    const router = useRouter()
    const projectId = params.projectId as string

    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        avgScore: 0
    })
    const [activeRound, setActiveRound] = useState<string>('1')

    useEffect(() => {
        if (!projectId) return;
        const fetchProject = async () => {
            const supabase = createClient()

            // 1. Fetch Project Details (only once or if projectId changes)
            if (!project || project.id !== projectId) {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*, groups(name)')
                    .eq('id', projectId)
                    .single()

                if (error || !data) {
                    console.error('Failed to load project:', error)
                    router.push('/admin/projects')
                    return
                }
                setProject(data)
                // Set initial activeRound to project's current round
                setActiveRound(data.round?.toString() || '1')
            }
        }
        fetchProject()
    }, [projectId, router])

    useEffect(() => {
        if (!projectId || !activeRound) return;
        const fetchStats = async () => {
            const supabase = createClient()
            const roundNum = parseInt(activeRound)

            // 2. Fetch Summary Stats for the SELECT ACTIVE ROUND
            const { count: totalParticipants } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('project_id', projectId)

            const { data: records } = await supabase
                .from('diagnosis_records')
                .select('total_score')
                .eq('project_id', projectId)
                .eq('round', roundNum)

            const completed = records?.length || 0
            const avg = completed > 0
                ? records!.reduce((sum, r) => sum + (r.total_score || 0), 0) / completed
                : 0

            setStats({
                total: totalParticipants || 0,
                completed,
                avgScore: Math.round(avg * 10) / 10
            })
            setLoading(false)
        }
        fetchStats()
    }, [projectId, activeRound])

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-20 animate-pulse text-slate-400">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin mb-4"></div>
            <p className="font-medium">프로젝트 정보를 불러오는 중입니다...</p>
        </div>
    )
    if (!project) return null

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header / Breadcrumb - Compact Version */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm relative overflow-hidden group/header">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover/header:scale-110"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => router.push('/admin/projects')} 
                            className="h-8 w-8 shrink-0 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 border border-slate-100 transition-all"
                        >
                            <ArrowLeft size={16} />
                        </Button>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                                    {project.name}
                                </h1>
                                <Badge className={`px-1.5 py-0 rounded-md font-bold text-[9px] border-none shadow-sm ${
                                    project.status === 'active' 
                                        ? 'bg-emerald-500 text-white' 
                                        : 'bg-slate-400 text-white'
                                }`}>
                                    {project.status === 'active' ? 'LIVE' : 'CLOSED'}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-y-1 mt-1 text-[11px]">
                                <span className="flex items-center gap-1 text-indigo-600 font-bold">
                                    <TrendingUp size={12} />
                                    Round {project.round}
                                </span>
                                <span className="mx-2 text-slate-200 text-[10px]">|</span>
                                <span className="flex items-center gap-1 text-slate-500 font-medium">
                                    <Building2 size={12} className="text-slate-400" />
                                    {project.groups?.name || 'No Institution'}
                                </span>
                                <span className="mx-2 text-slate-200 text-[10px]">|</span>
                                <span className="flex items-center gap-1 text-slate-400 font-medium">
                                    <Calendar size={12} />
                                    {project.start_date || 'N/A'} — {project.end_date || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="h-8 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-lg px-3 text-[11px] font-bold text-slate-600">
                            Edit Project
                        </Button>
                        <Button className="h-8 bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-3 text-[11px] font-bold shadow-sm flex gap-1.5">
                            Add Participants
                            <Plus size={14} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Summary Detail Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Summary Detail Cards - Compact Version */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="dashboard-card bg-indigo-600 text-white border-none p-5 group">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest opacity-70">Progress</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight mb-0.5">
                                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}<span className="text-base font-semibold ml-0.5">%</span>
                            </h2>
                            <p className="text-indigo-100 text-[10px] font-medium opacity-80">{stats.completed} / {stats.total} SUBMITTED</p>
                        </div>
                        <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                            <Users size={20} className="text-white" />
                        </div>
                    </div>
                    <div className="w-full bg-black/10 h-1.5 mt-5 rounded-full overflow-hidden">
                        <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }} />
                    </div>
                </div>

                <div className="dashboard-card p-5 group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="label-text mb-0.5">AVG SCORE</p>
                            <h2 className="data-text">{stats.avgScore}<span className="text-xs font-medium ml-1 text-slate-300 tracking-normal">PT</span></h2>
                        </div>
                        <div className="h-8 w-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-6">
                            <BarChart3 size={16} />
                        </div>
                    </div>
                    <div className="mt-auto grid grid-cols-7 gap-1 h-8 items-end opacity-80 group-hover:opacity-100 transition-opacity">
                        {[75, 82, 68, 90, 85, 78, 88].map((v, i) => (
                            <div key={i} className="bg-slate-50 rounded-sm h-full relative" title={`D${i + 1}`}>
                                <div className="bg-emerald-400 rounded-t-sm w-full absolute bottom-0" style={{ height: `${v}%` }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card p-5 group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="label-text mb-0.5 text-rose-400">PENDING</p>
                            <h2 className="data-text text-rose-500">{stats.total - stats.completed}<span className="text-xs font-medium ml-1 text-rose-300 tracking-normal">COMPANIES</span></h2>
                        </div>
                        <div className="h-8 w-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                            <AlertCircle size={16} />
                        </div>
                    </div>
                    
                    <div className="mt-auto">
                        <Button
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-8 font-bold rounded-lg text-[10px] gap-2 transition-all"
                        >
                            <Mail size={12} /> SEND REMINDERS
                        </Button>
                    </div>
                </div>
            </div>
            </div>

            {/* Final UX: Round-based Navigation - Compact Version */}
            <div className="dashboard-card">
                <Tabs value={activeRound} onValueChange={setActiveRound} className="w-full">
                    <div className="flex items-center justify-between px-6 py-0 border-b border-slate-50 bg-slate-50/20">
                        <TabsList className="bg-transparent h-auto p-0 gap-6">
                            {[1, 2, 3].map((r) => (
                                <TabsTrigger
                                    key={r}
                                    value={r.toString()}
                                    className="data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-600 border-b-2 border-transparent rounded-none px-0 py-4 h-full text-[13px] font-bold text-slate-400 transition-all hover:text-slate-600"
                                    disabled={r > (project.round || 1)}
                                >
                                    ROUND {r}
                                    {r === project.round && (
                                        <div className="ml-1.5 w-1 h-1 bg-rose-500 rounded-full"></div>
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-md p-0.5">
                                <Button size="sm" variant="ghost" className="h-6 text-[10px] font-bold px-2 bg-slate-100">DASHBOARD</Button>
                                <Button size="sm" variant="ghost" className="h-6 text-[10px] font-bold px-2 text-slate-400 hover:text-slate-600">COMPARISON</Button>
                            </div>
                        </div>
                    </div>

                    {[1, 2, 3].map((r) => (
                        <TabsContent key={r} value={r.toString()} className="mt-0 outline-none p-5 space-y-6">
                            {/* Round Content - Adjusted to treat ParticipantsTable as a separate horizontal block or properly aligned */}
                            <div className="space-y-6">
                                <ProjectStatistics projectId={projectId} projectRound={r} />
                                <ParticipantsTable projectId={projectId} projectRound={r} />
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}
