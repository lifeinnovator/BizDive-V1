'use client'

import React from 'react'
import InstitutionAdminDashboard from '@/components/admin/dashboards/InstitutionAdminDashboard'
import { AlertCircle } from 'lucide-react'

// Mock Data for Demo
const MOCK_PROFILE = {
    user_name: '데모 사용자',
    group_name: '(주)비즈다이브랩',
    role: 'group_admin'
}

const MOCK_STATS = {
    totalUsers: 142,
    totalRecords: 128,
    avgScore: 68.4,
    totalProjects: 3,
    recentActivities: [
        {
            company: '그로스랩',
            time: '방금 전',
            score: 72,
        },
        {
            company: '에이아이테크',
            time: '2시간 전',
            score: 65,
        },
        {
            company: '블루오션벤처스',
            time: '5시간 전',
            score: 81,
        },
        {
            company: '스마트솔루션즈',
            time: '1일 전',
            score: 59,
        },
        {
            company: '넥스트스텝',
            time: '2일 전',
            score: 77,
        }
    ]
}

export default function AdminDemoPage() {
    return (
        <div className="space-y-6">
            {/* Demo Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 w-full animate-in slide-in-from-top-4 fade-in duration-500">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5 sm:mt-0" size={20} />
                <div className="flex-1">
                    <p className="text-amber-800 text-sm font-semibold">
                        현재 관리자 데모 화면을 보고 계십니다.
                    </p>
                    <p className="text-amber-700/80 text-xs mt-0.5">
                        임의의 데이터로 구성된 샘플 페이지이며, 실제 기능(프로젝트 생성, 유저 관리 등)을 이용하시려면 정식 계정으로 로그인해주세요.
                    </p>
                </div>
            </div>

            {/* Render Dashboard with Mock Data */}
            <InstitutionAdminDashboard profile={MOCK_PROFILE} stats={MOCK_STATS} isDemo={true} />
        </div>
    )
}
