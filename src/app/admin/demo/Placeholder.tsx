'use client';

import React from 'react';
import { Users2, Settings as SettingsIcon, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function PlaceholderPage({ title, description, icon: Icon }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 animate-bounce">
                <Icon size={40} />
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
                <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">{description}</p>
            </div>
            <Card className="p-4 bg-amber-50 border-none shadow-sm flex items-center gap-3 rounded-2xl">
                <AlertCircle size={18} className="text-amber-500" />
                <span className="text-[12px] font-bold text-amber-700">이 페이지는 현재 데모 준비 중입니다 (v1.0.0 정식 버전 포함 예정).</span>
            </Card>
        </div>
    );
}
