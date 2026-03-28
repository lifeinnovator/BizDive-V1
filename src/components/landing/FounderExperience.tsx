"use client";

import React from 'react';
import { motion } from 'framer-motion';

const FounderExperience = () => {
    return (
        <section className="py-20 sm:py-32 bg-white px-6 md:px-12 border-b border-indigo-50">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 sm:mb-24 md:w-2/3">
                    <div className="flex flex-col items-start gap-1 sm:gap-4 mb-6 sm:mb-8">
                        <span className="px-4 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg text-[13px] font-bold tracking-[0.1em] uppercase shadow-sm">
                            For Founders
                        </span>
                        <span className="text-[14px] sm:text-base font-bold text-slate-500">
                            비즈니스의 입체적 진단이 필요한 창업가
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-indigo-950 mb-6 sm:mb-8 leading-tight break-keep">
                        아이디어의 현주소, <br />
                        가장 빠르고 냉정하게.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl break-keep">
                        복잡한 텍스트 심사나 피칭 전에, <br className="sm:hidden" />
                        BizDive의 입체적 진단 모델을 통해 <br className="sm:hidden" />
                        시장에서의 실제 생존 가능성을 테스트하세요.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { step: '01', title: '7D 핵심 지표 해부', desc: '시장성, 경쟁력, 수익성 등 7가지 다각도 관점에서 비즈니스 모델을 파편부터 결합까지 검증합니다.' },
                        { step: '02', title: '등급 산출 알고리즘', desc: '직관적이고 치밀하게 짜인 로직을 바탕으로 현재 수준을 정확하게 계산된 점수와 등급으로 반환합니다.' },
                        { step: '03', title: '누적 성장 궤적 관리', desc: '진단 결과를 축적하여 기업의 성장 단계별 변화를 한눈에 파악하고, 다음 단계 도약을 위한 지속적인 경영 제언을 제공합니다.' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-indigo-50/30 p-10 sm:p-12 border border-indigo-100/50 transition-colors hover:bg-white hover:shadow-xl hover:border-transparent group"
                        >
                            <span className="text-[40px] font-light text-indigo-200 mb-8 block font-mono group-hover:text-indigo-600 transition-colors">{item.step}</span>
                            <h4 className="text-[22px] font-extrabold tracking-tight text-indigo-950 mb-4">{item.title}</h4>
                            <p className="text-[16px] text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FounderExperience;
