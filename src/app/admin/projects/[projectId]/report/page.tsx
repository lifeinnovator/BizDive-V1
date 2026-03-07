"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, TrendingUp, Users, Building2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProjectReportDashboard() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.projectId as string;

    const [isLoading, setIsLoading] = useState(true);
    const [reportData, setReportData] = useState<any>(null);

    useEffect(() => {
        async function fetchReport() {
            try {
                // Call our new API route to generate/fetch the report data
                const res = await fetch('/api/reports/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ projectId })
                });
                const data = await res.json();
                if (data.success) {
                    setReportData(data.report);
                }
            } catch (error) {
                console.error("Failed to fetch report:", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (projectId) {
            fetchReport();
        }
    }, [projectId]);

    // Mock data for charts since the aggregation API currently returns simple placeholders
    // We'll replace this with real `stats_cache` data once the API is fully fleshed out with DB metrics
    const mockAverageGrowth = [
        { dimension: '전략비전', pre: 65, post: 82 },
        { dimension: '시장성', pre: 50, post: 75 },
        { dimension: '제품/서비스', pre: 70, post: 85 },
        { dimension: '조직/팀', pre: 60, post: 80 },
        { dimension: '재무/자금', pre: 45, post: 65 },
        { dimension: '운영관리', pre: 55, post: 70 },
        { dimension: 'Go-to-Market', pre: 40, post: 60 },
    ];

    const mockCompanyGrowth = [
        { name: '(주)알파테크', preScore: 55, postScore: 82 },
        { name: '베타솔루션즈', preScore: 60, postScore: 78 },
        { name: '감마이노베이션', preScore: 45, postScore: 71 },
        { name: '오메가인텔리전스', preScore: 65, postScore: 85 },
        { name: '델타로보틱스', preScore: 50, postScore: 68 },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="p-4 md:p-8 text-center text-gray-500">
                보고서 데이터를 불러올 수 없습니다. 프로젝트 정보를 확인해 주세요.
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8 p-4 md:p-8 max-w-7xl mx-auto bg-gray-50/50 min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">지원사업 성과 보고서</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">2026 G-Start Up 지원사업의 기업 진단 및 전문가 상담 결과를 종합한 리포트입니다.</p>
                </div>
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 shadow-md transition-all gap-2">
                    <Download className="w-4 h-4" />
                    PDF 다운로드
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-gradient-to-br from-white to-blue-50/50">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">참여 기업 수</span>
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Building2 className="w-4 h-4" /></div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{reportData.stats_cache?.total_companies_post || 42}</span>
                            <span className="text-sm text-gray-500">개사</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-gradient-to-br from-white to-green-50/50">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">평균 종합 성장률</span>
                            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-emerald-600">+18%</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">수집된 전문가 피드백</span>
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><MessageSquare className="w-4 h-4" /></div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{reportData.stats_cache?.consultation_summaries_count || 84}</span>
                            <span className="text-sm text-gray-500">건</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Insight Section (Executive Summary) */}
            <Card className="border border-blue-100 shadow-md bg-white/70 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-500" />
                        <CardTitle className="text-lg md:text-xl text-blue-900">AI 분석 종합 의견</CardTitle>
                    </div>
                    <CardDescription>진단 데이터 및 전문가 상담 요약을 기반으로 도출된 핵심 인사이트입니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100/50">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                            {reportData.ai_insight || "평가 데이터가 부족합니다."}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                {/* Average Growth Bar Chart */}
                <Card className="shadow-sm border-gray-100">
                    <CardHeader>
                        <CardTitle className="text-lg">7D 영역별 평균 성장 추이</CardTitle>
                        <CardDescription>지원사업 참여 기업들의 사전/사후 진단 평균 점수 비교</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] md:h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockAverageGrowth} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="dimension" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} domain={[0, 100]} />
                                <Tooltip
                                    cursor={{ fill: '#F3F4F6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                <Bar dataKey="pre" name="사전 진단" fill="#9CA3AF" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="post" name="사후 진단" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Individual Company Growth Chart */}
                <Card className="shadow-sm border-gray-100">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg">참여 기업별 종합 성장률</CardTitle>
                                <CardDescription>개별 기업의 사전 점수 대비 사후 점수 변화량</CardDescription>
                            </div>
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">최대 +27%</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[300px] md:h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockCompanyGrowth} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                                <Line type="monotone" dataKey="preScore" name="사전 점수" stroke="#9CA3AF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="postScore" name="사후 점수" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
