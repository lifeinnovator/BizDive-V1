'use client';

import React from 'react';
import PlaceholderPage from '../Placeholder';
import { Users2 } from 'lucide-react';

export default function UsersDemoPage() {
    return (
        <PlaceholderPage 
            title="기업/사용자 관리" 
            description="참여 기업의 관리자 계정을 생성하고, 권한을 제어하는 관리 전용 기능을 제공합니다."
            icon={Users2}
        />
    );
}
