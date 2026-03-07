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
    ExternalLink,
    Copy,
    Plus,
    Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState<any>(null)
    const [stats, setStats] = useState({ profiles: 0, guests: 0 })

    React.useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
            setUserProfile(profile)

            // 1. Fetch Registered Users
            const { data: profilesData, error: pError } = await supabase
                .from('profiles')
                .select('*, groups(name)')
                .order('created_at', { ascending: false })

            if (pError) console.error("Profiles fetch error:", pError)

            // 2. Fetch Guest Records (Unregistered)
            const { data: guestsData, error: gError } = await supabase
                .from('diagnosis_records')
                .select('id, guest_name, guest_email, guest_company, created_at, projects(name)')
                .is('user_id', null)
                .not('guest_email', 'is', null)
                .order('created_at', { ascending: false })

            if (gError) console.error("Guests fetch error:", gError)

            const formattedGuests = (guestsData || []).map(g => ({
                id: g.id,
                user_name: g.guest_name || g.guest_email || '진단 사용자',
                email: g.guest_email || '-',
                company_name: g.guest_company || '-',
                role: 'guest',
                groups: { name: (g.projects as any)?.name ? (g.projects as any).name : '개별 진단' },
                created_at: g.created_at,
                is_guest: true
            }))

            const allUsers = [...(profilesData || []), ...formattedGuests].sort((a, b) => 
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )

            setUsers(allUsers)
            setStats({ 
                profiles: profilesData?.length || 0, 
                guests: formattedGuests.length || 0 
            })
            setLoading(false)
        }
        fetchData()
    }, [])

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('ID가 클립보드에 복사되었습니다.')
    }

    const filteredUsers = users.filter(user =>
        user.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Supabase-style Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Users size={14} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Authentication</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">사용자 관리</h1>
                    <p className="text-sm text-slate-500 font-medium pt-1">
                        플랫폼 전체 가입자 <span className="text-indigo-600 font-bold">{stats.profiles}명</span> 및 
                        진단 게스트 <span className="text-indigo-600 font-bold">{stats.guests}명</span>을 관리합니다.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9 px-4 text-slate-600 border-slate-200 bg-white hover:bg-slate-50 text-[12px] font-semibold gap-2">
                        <Download size={14} />
                        전체 내보내기
                    </Button>
                    <Button className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold gap-2 shadow-sm">
                        <Plus size={14} />
                        사용자 추가
                    </Button>
                </div>
            </div>

            {/* Filter Hub */}
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-grow flex items-center gap-3 bg-white px-3 py-2 rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all">
                    <Search size={16} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="ID, 이메일, 이름으로 검색..."
                        className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-slate-400 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-[38px] px-4 text-slate-500 border-slate-200 text-[12px] font-semibold gap-2">
                        <Filter size={14} />
                        필터
                    </Button>
                    <div className="h-[38px] w-px bg-slate-200 mx-1"></div>
                    <p className="flex items-center text-[12px] text-slate-400 font-medium px-2">
                        전체 {filteredUsers.length}개 결과
                    </p>
                </div>
            </div>

            {/* Supabase-style Table Editor Layout */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 border-r border-slate-200/60 w-32">UID</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 border-r border-slate-200/60">표시 이름 / 이메일</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 border-r border-slate-200/60 w-32">권한</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 border-r border-slate-200/60 w-48">소속 기업/그룹</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 border-r border-slate-200/60 w-32">가입일</th>
                                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 w-20 text-center">동작</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic text-sm">데이터를 불러오는 중...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic text-sm">일치하는 사용자가 없습니다.</td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-4 py-3 border-r border-slate-100/60">
                                        <div className="flex items-center justify-between gap-2 overflow-hidden">
                                            <span className="font-mono text-[10px] text-slate-400 truncate">{user.id?.slice(0, 12)}...</span>
                                            <button 
                                                onClick={() => handleCopy(user.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded text-slate-400 transition-all"
                                            >
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-100/60">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                                user.is_guest ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                                            }`}>
                                                {user.user_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[12px] font-semibold text-slate-900 truncate">{user.user_name || '이름 없음'}</p>
                                                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-100/60">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.role === 'super_admin' ? 'bg-emerald-500' : user.role === 'group_admin' ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                                            <span className="text-[11px] font-medium text-slate-700">
                                                {user.role === 'super_admin' ? '최고 관리자' : user.role === 'group_admin' ? '기관 관리자' : user.is_guest ? '게스트' : '일반 사용자'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-100/60">
                                        <div className="space-y-0.5">
                                            <p className="text-[12px] font-medium text-slate-700 truncate">{user.company_name || '-'}</p>
                                            <p className="text-[10px] text-indigo-600 font-bold truncate">{user.groups?.name || '-'}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-r border-slate-100/60 text-slate-500 text-[12px]">
                                        {user.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        }).replace(/\. /g, '.').replace(/\.$/, '') : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link href={`/ops/users/${user.id}`}>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-100 rounded">
                                                    <ExternalLink size={14} />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:bg-slate-100 rounded">
                                                <MoreHorizontal size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="bg-slate-50/50 border-t border-slate-200 px-4 py-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">1-{filteredUsers.length} of {filteredUsers.length} items</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled className="h-7 px-3 text-[11px] font-medium">Previous</Button>
                        <Button variant="outline" size="sm" disabled className="h-7 px-3 text-[11px] font-medium">Next</Button>
                    </div>
                </div>
            </div>

            {/* Sync Alert (Only for Super Admin) */}
            {userProfile?.role === 'super_admin' && (
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <Users size={16} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-indigo-900">도움이 필요하신가요?</h4>
                        <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                            Supabase Auth 목록과 어드민 목록이 일치하지 않는 경우, 프로필 동기화가 필요할 수 있습니다. 
                            `supabase/debug_rls.sql` 파일에 제공된 [5번] 스크립트를 Supabase 대시보드에서 한 번 실행해 주세요.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
