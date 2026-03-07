'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutGrid,
    Users2,
    Building,
    Database,
    Settings,
    Briefcase,
    X,
    Menu,
    ChevronLeft,
    MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const getNavItems = (role: string) => {
    if (role === 'super_admin') {
        return [
            { name: '운영 총괄 대시보드', href: '/ops', icon: LayoutGrid },
            { name: '기관/그룹 개설 관리', href: '/ops/groups', icon: Building },
            { name: '전체 사업 통합 관리', href: '/ops/projects', icon: Briefcase },
            { name: '전문가 매칭/상담 관리', href: '/ops/consultations', icon: MessageSquare },
            { name: '플랫폼 사용자 관리', href: '/ops/users', icon: Users2 },
            { name: '진단 로직 CMS', href: '/ops/cms', icon: Database },
            { name: '시스템 설정', href: '/ops/settings', icon: Settings },
        ]
    }

    return [
        { name: '대시보드', href: '/admin', icon: LayoutGrid },
        { name: '사업관리', href: '/admin/projects', icon: Briefcase },
        { name: '사용자 관리', href: '/admin/users', icon: Users2 },
    ]
}

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    userRole?: string;
    isDemo?: boolean;
}

export default function AdminSidebar({
    isCollapsed,
    toggleCollapse,
    userRole = 'group_admin',
    isDemo = false
}: SidebarProps) {
    const pathname = usePathname()
    const navItems = getNavItems(userRole)

    return (
        <aside
            className={`bg-white h-screen fixed left-0 top-0 z-40 transition-all duration-300 border-r border-slate-200 ${isCollapsed ? '-translate-x-full md:translate-x-0 w-64 md:w-16' : 'translate-x-0 w-64'
                }`}
        >
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center shadow-sm">
                                <span className="text-white text-[10px] font-black tracking-tighter">BD</span>
                            </div>
                            <span className="text-sm font-bold tracking-tight text-slate-900">
                                BizDive
                                <span className="text-slate-400 ml-1 text-[10px] font-medium uppercase tracking-widest">{userRole === 'super_admin' ? 'OPS' : 'ADMIN'}</span>
                            </span>
                        </div>
                    )}
                    <button
                        onClick={toggleCollapse}
                        className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hidden md:block"
                    >
                        {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
                    </button>
                    {!isCollapsed && (
                        <button
                            onClick={toggleCollapse}
                            className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-400 md:hidden"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-grow py-4 px-2 space-y-0.5 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const href = isDemo ? (item.href === '/admin' ? '/admin/demo' : item.href.replace('/admin/', '/admin/demo/')) : item.href
                        const isActive = pathname === href || (href !== '/admin' && href !== '/ops' && pathname.startsWith(href))
                        return (
                            <Link
                                key={item.name}
                                href={href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 shadow-[inset_3px_0_0_0_#4f46e5]'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-indigo-600' : 'group-hover:text-slate-700'} />
                                {!isCollapsed && <span className={`text-[12px] whitespace-nowrap ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <Link href="/" className="text-[11px] text-slate-400 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors">
                        {!isCollapsed && <span>← 사용자 화면 가기</span>}
                    </Link>
                </div>
            </div>
        </aside>
    )
}
