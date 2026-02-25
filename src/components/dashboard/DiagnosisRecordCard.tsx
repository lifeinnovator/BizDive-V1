'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, User, Calendar, ChevronRight } from 'lucide-react'
import DeleteRecordButton from '@/components/dashboard/DeleteRecordButton'
import { useTransition } from 'react'

interface RecordCardProps {
    record: any;
    profile: any;
    stageInfo: any;
    stageColor: any;
}

export default function DiagnosisRecordCard({ record, profile, stageInfo, stageColor }: RecordCardProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleNavigation = () => {
        startTransition(() => {
            router.push(`/report/${record.id}`)
        })
    }

    return (
        <Card className={`hover:shadow-md transition-all duration-200 border-gray-200 overflow-hidden group ${isPending ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}>
            <CardContent className="p-0">
                <div className="flex items-center h-[88px]">
                    <div
                        onClick={handleNavigation}
                        className="flex flex-grow items-center h-full no-underline overflow-hidden"
                    >
                        <div className={`w-[88px] h-full flex flex-col items-center justify-center border-r border-gray-100 bg-gray-50 group-hover:bg-indigo-50/30 transition-colors shrink-0`}>
                            <div className="text-[11px] font-medium text-gray-400 mb-0.5 uppercase tracking-wide">Score</div>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-xl font-bold text-gray-900 leading-none">{(record.total_score || 0).toFixed(1)}</span>
                                <span className="text-[10px] text-gray-400 font-medium">/ 100</span>
                            </div>
                            <div className={`mt-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter ${stageColor.bg} ${stageColor.text}`}>
                                Stage {record.stage_result}
                            </div>
                        </div>

                        <div className="flex-grow px-5 py-4 min-w-0 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1.5 min-w-0">
                                <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                                    {stageInfo.stageName}
                                </h3>
                                <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-medium border-gray-200 text-gray-500 whitespace-nowrap shrink-0">
                                    ID: {record.id.split('-')[0]}
                                </Badge>
                            </div>
                            <p className="text-[13px] text-gray-500 line-clamp-1 mb-2">
                                {stageInfo.shortDesc}
                            </p>

                            <div className="flex items-center gap-4 text-[11px] text-gray-400 font-medium">
                                <div className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    <span>{profile?.company_name || '회사 정보 없음'}</span>
                                </div>
                                <div className="flex items-center gap-1 border-l border-gray-100 pl-4 text-gray-300">
                                    <User className="w-3 h-3" />
                                    <span>{profile?.user_name || '사용자'}</span>
                                </div>
                                <div className="flex items-center gap-1 border-l border-gray-100 pl-4">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(record.created_at).toLocaleDateString()} {new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-5 shrink-0">
                            <div className={`w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-300 group-hover:border-indigo-200 ${isPending ? 'text-indigo-400 animate-pulse' : 'group-hover:text-indigo-500'} group-hover:shadow-sm transition-all`}>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center shrink-0 pr-4 gap-2 border-l border-gray-50 h-full bg-white z-20">
                        <DeleteRecordButton recordId={record.id} />
                        <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-400 transition-colors hidden sm:block pointer-events-none" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
