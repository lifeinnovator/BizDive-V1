
import { createClient } from './supabase-server'
import { Database } from '@/types/database'

type Question = Database['public']['Tables']['questions']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface DiagnosisCriteria {
    stage: string | null
    industry: string | null
}

// 허용된 스테이지 값 — PostgREST 필터 인젝션 방지용 화이트리스트
const VALID_STAGES = new Set(['P', 'E', 'V', 'M'])
// 산업 코드: 영문 대소문자·숫자·언더스코어만 허용 (최대 30자)
const SAFE_CODE_PATTERN = /^[a-zA-Z0-9_]{1,30}$/

export async function getDiagnosisQuestions(profile: DiagnosisCriteria): Promise<Question[]> {
    const supabase = await createClient()

    // 입력값 검증 — 허용되지 않은 값이면 공통 질문만 반환
    const safeStage = profile.stage && VALID_STAGES.has(profile.stage) ? profile.stage : null
    const safeIndustry = profile.industry && SAFE_CODE_PATTERN.test(profile.industry) ? profile.industry : null

    // Build filters dynamically to handle potential nulls
    const filters = [];

    // Always include common questions (if any)
    filters.push('category.eq.common');

    if (safeStage) {
        filters.push(`and(category.eq.stage,mapping_code.eq.${safeStage})`);
        filters.push(`and(category.eq.esg,mapping_code.eq.${safeStage})`);
    }

    if (safeStage && safeIndustry) {
        const stageIndustryCode = `${safeStage}_${safeIndustry}`;
        filters.push(`and(category.eq.industry,mapping_code.eq.${stageIndustryCode})`);
    }

    const { data: allQuestions, error } = await supabase
        .from('questions')
        .select('*')
        .or(filters.join(','))

    if (error) {
        console.error("Error fetching questions:", error)
        return []
    }

    if (!allQuestions) return []

    return allQuestions.sort((a, b) => {
        if (a.dimension < b.dimension) return -1
        if (a.dimension > b.dimension) return 1
        return (a.display_order || 0) - (b.display_order || 0)
    })
}
