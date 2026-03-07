'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    ArrowUpDown,
    User,
    Building2,
    Mail,
    Calendar,
    ChevronRight,
    ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ScoreIndicator from '@/components/admin/ScoreIndicator'

const mockUsers = [
    { id: 'u1', name: '김민수 대표', email: 'kms@startup.com', company: '에이비씨 테크', group: '서울창업허브 2024', role: 'user', lastDiagnosis: '2024.02.23', lastScore: 82.4, status: 'Active' },
    { id: 'u2', name: '이영희 팀장', email: 'yh.lee@corp.io', company: '디브릿지 소프트', group: '글로벌 SaaS 8기', role: 'user', lastDiagnosis: '2024.02.20', lastScore: 45.2, status: 'Active' },
    { id: 'u3', name: '박준영 소장', email: 'jyp@lab.net', company: '미래 로보틱스', group: '서울창업허브 2024', role: 'user', lastDiagnosis: '2024.02.18', lastScore: 68.7, status: 'Inactive' },
    { id: 'u4', name: '최다은 본부장', email: 'de.choi@biz.com', company: '그린 에너지 솔루션', group: 'K-Startup 지원단', role: 'user', lastDiagnosis: '2024.02.15', lastScore: 91.0, status: 'Active' },
    { id: 'u5', name: '정우성 팀장', email: 'ws.jung@local.org', company: '로컬 커넥트', group: '경기센터 예비창업', role: 'user', lastDiagnosis: '2024.02.10', lastScore: 54.5, status: 'Active' },
]

import { createClient } from '@/lib/supabase'

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState<any>(null)
    const [groups, setGroups] = useState<any[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()

            // 1. Get current user profile
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            setUserProfile(profile)

            // 2. Fetch Groups (for select filter)
            let groupsQ = supabase.from('groups').select('*')
            if (profile?.role === 'group_admin') {
                groupsQ = groupsQ.eq('id', profile.group_id)
            }
            const { data: groupsData } = await groupsQ
            setGroups(groupsData || [])

            // 3. Fetch Users with RBAC
            let usersQ = supabase.from('profiles').select('*, groups(name)')

            if (profile?.role === 'group_admin' && profile.group_id) {
                usersQ = usersQ.eq('group_id', profile.group_id)
            }

            const { data: usersData } = await usersQ.order('created_at', { ascending: false })
            setUsers(usersData || [])
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleRoleChange = async (targetUserId: string, newRole: string) => {
        const supabase = createClient()
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole })
            .eq('id', targetUserId)

        if (error) {
            alert('권한 변경에 실패했습니다: ' + error.message)
        } else {
            setUsers(users.map(u => u.id === targetUserId ? { ...u, role: newRole } : u))
        }
    }

    const filteredUsers = users.filter(user =>
    (user.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Header Section - Compact Version */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">사용자 관리</h1>
                    <p className="text-slate-400 mt-1 font-medium text-[11px]">참여 기업 계정과 운영사 관리자 계정을 관리합니다.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-9 px-4 text-slate-600 border-slate-200 bg-white hover:bg-slate-50 rounded-lg text-[11px] font-bold shadow-sm flex gap-2 transition-all">
                        <Download size={14} />
                        전체 내보내기
                    </Button>
                </div>
            </div>

            {/* Filter & Search Bar - Compact Version */}
            <div className="dashboard-card p-3 flex flex-col lg:flex-row gap-3">
                <div className="flex-grow flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/50 transition-all">
                    <Search size={14} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="이름, 이메일 또는 기업명으로 검색..."
                        className="bg-transparent border-none outline-none text-[12px] w-full placeholder:text-slate-400 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/10">
                        <option value="">그룹 필터: 전체</option>
                        {groups.map(g => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </select>
                    <Button variant="ghost" className="h-8 gap-2 text-[11px] font-bold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50">
                        <Filter size={14} />
                        필터
                    </Button>
                </div>
            </div>

            {/* Users Table - Compact Version */}
            <div className="dashboard-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 bg-slate-50/30">
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">사용자 정보</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">소속 기업/그룹</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">권한</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">상태</th>
                                <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400 italic text-[12px]">사용자 데이터를 불러오는 중...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-slate-400 italic text-[12px]">검색 결과와 일치하는 사용자가 없습니다.</td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 text-[11px] group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300">
                                                {user.user_name?.[0] || user.email[0]}
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.user_name || '이름 없음'}</p>
                                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                                                    <Mail size={10} />
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="space-y-0.5">
                                            <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                                                <Building2 size={12} className="text-slate-400" />
                                                {user.company_name || '기업 정보 없음'}
                                            </p>
                                            <p className="text-[9px] text-indigo-500 font-bold uppercase tracking-wide">
                                                {user.groups?.name || '일반 그룹'}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <select
                                            disabled={userProfile?.role !== 'super_admin'}
                                            className="bg-white border border-slate-200 rounded-md px-2 py-0.5 text-[10px] font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 disabled:opacity-50"
                                            value={user.role || 'user'}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        >
                                            <option value="user">일반 사용자</option>
                                            <option value="group_admin">기관 운영자</option>
                                            <option value="super_admin">최고 관리자</option>
                                        </select>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase">정상</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1 translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                            <Link href={`/admin/users/${user.id}`}>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                                    <ExternalLink size={14} />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                                <MoreHorizontal size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && (
                    <div className="px-5 py-3 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
                        <p className="text-[11px] text-slate-400 font-bold uppercase">{filteredUsers.length}명의 사용자가 검색되었습니다.</p>
                        <div className="flex gap-1.5">
                            <Button variant="outline" size="sm" disabled className="h-7 px-3 rounded-md text-[10px] font-bold text-slate-500 border-slate-200">이전</Button>
                            <Button variant="outline" size="sm" disabled className="h-7 px-3 rounded-md text-[10px] font-bold text-slate-500 border-slate-200">다음</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
