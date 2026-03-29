'use client';

import React from 'react';
import PlaceholderPage from '../Placeholder';
import { Settings } from 'lucide-react';

export default function SettingsDemoPage() {
    return (
        <PlaceholderPage 
            title="운영자 설정" 
            description="기관별 로고, 서명 정보, 프로젝트 기간 등 시스템 전반의 운영 정책을 설정합니다."
            icon={Settings}
        />
    );
}
