"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-6 md:px-12 bg-white flex flex-col items-center justify-center text-center min-h-[70vh] sm:min-h-[75vh] selection:bg-indigo-900 selection:text-white border-b border-indigo-50">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto w-full"
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-tight border border-indigo-100 flex items-center gap-2 shadow-sm">
                        <img src="/favicon.png" alt="" className="w-4 h-4 opacity-80" />
                        BizDive - 7D 기업경영 심층자가진단
                    </span>
                </div>
                <h1 className="text-[36px] sm:text-[48px] lg:text-[76px] font-extrabold tracking-tighter text-indigo-950 leading-[1.2] sm:leading-[1.1] mb-6 sm:mb-8 break-keep">
                    직관을 넘어, <br />
                    데이터로 증명하는 <br />
                    비즈니스 경쟁력
                </h1>
                <p className="text-[17px] sm:text-xl text-slate-600 font-medium tracking-tight mb-4 max-w-3xl mx-auto leading-relaxed break-keep">
                    본 기업경영 자가진단은 <br className="md:hidden" />
                    서비스 디자인 방법론(Double Diamond)과 <br className="md:hidden" />
                    PSST 사업계획 방법론, 전략컨설팅 <br className="md:hidden" />
                    프레임워크 방법론 등을 융합하여 설계된 <br className="md:hidden" />
                    고도화된 경영 진단 도구입니다.
                    <br />
                    시장 기회 탐색부터 사업성 검증까지 <br className="md:hidden" />
                    7가지 핵심 영역을 입체적으로 <br className="md:hidden" />
                    정밀 분석합니다.
                </p>
                <p className="text-base sm:text-lg text-slate-500 font-medium tracking-tight mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed break-keep">
                    기업은 현재의 성장 단계를 명확히 인지하고, <br />
                    다음 단계로 도약하기 위한 구체적인 실행 전략을 수립할 수 있습니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/onboarding" className="w-full sm:w-auto">
                        <Button className="h-14 px-10 rounded-none bg-indigo-900 hover:bg-indigo-800 text-white text-[17px] font-bold w-full sm:w-auto flex items-center gap-2 group transition-all shadow-md">
                            무료 진단 시작하기
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
