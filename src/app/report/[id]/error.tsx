'use client'

import { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function ReportError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Report Page Error Boundary caught an error:", error)
    }, [error])

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <Card className="max-w-md w-full shadow-lg border-rose-100 bg-white">
                <CardHeader className="bg-rose-50/50 border-b border-rose-100 pb-4">
                    <CardTitle className="flex items-center gap-2 text-rose-600">
                        <AlertTriangle className="w-5 h-5" />
                        진단 리포트 로딩 오류
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                        상세 진단 리포트를 불러오거나 렌더링하는 중 예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                    </p>

                    <div className="bg-slate-100 p-3 rounded-md overflow-auto text-xs font-mono text-slate-500 max-h-32">
                        {error.message || "알 수 없는 클라이언트 측 렌더링 오류입니다."}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            onClick={() => reset()}
                            variant="outline"
                            className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            다시 시도
                        </Button>
                        <Button
                            asChild
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Link href="/dashboard">
                                <Home className="w-4 h-4 mr-2" />
                                대시보드로
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
