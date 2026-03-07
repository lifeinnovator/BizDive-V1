'use client'

import React, { useState } from 'react'
import SuperAdminSidebar from '@/components/admin/SuperAdminSidebar'
import { Bell, Search, User, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function OpsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [userProfile, setUserProfile] = useState<any>(null)
    const [groupName, setGroupName] = useState<string>('')
    const pathname = usePathname()

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        const fetchProfile = async () => {
            const { createClient } = await import('@/lib/supabase')
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role, group_id')
                    .eq('id', user.id)
                    .single()

                setUserProfile(profile)

                if (profile?.role === 'super_admin') {
                    setGroupName('BizDive 운영 사무국')
                } else if (profile?.group_id) {
                    const { data: group } = await supabase
                        .from('groups')
                        .select('name')
                        .eq('id', profile.group_id)
                        .single()
                    setGroupName(group?.name || '소속 그룹 없음')
                }
            }
        }
        fetchProfile()
    }, [])

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <SuperAdminSidebar
                isCollapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
                userRole={userProfile?.role}
            />

            <div
                className={`flex-grow flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'
                    }`}
            >
                {/* Mobile Overlay */}
                {!isCollapsed && (
                    <div
                        className="fixed inset-0 bg-indigo-950/50 z-30 md:hidden"
                        onClick={() => setIsCollapsed(true)}
                    />
                )}

                {/* Topbar */}
                <header className="h-14 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 flex-grow">
                        <button
                            className="md:hidden p-1.5 text-slate-400 hover:bg-slate-50 rounded-md"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <Menu size={18} />
                        </button>
                        <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/50 transition-all w-full max-w-sm">
                            <Search size={14} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="데이터 상세 검색..."
                                className="bg-transparent border-none outline-none text-[12px] w-full placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2.5 border-r border-slate-200 pr-4 mr-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-[12px] font-bold text-slate-800 leading-none">
                                    BizDive 운영국
                                </p>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">
                                    최고 관리자 모드
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm">
                                <User size={16} />
                            </div>
                        </div>

                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    )
}
