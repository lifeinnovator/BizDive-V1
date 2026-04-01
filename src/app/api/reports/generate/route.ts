import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

interface DiagnosisRecord {
    id: string;
    user_id: string;
    company_id: string;
    diag_type: string;
    scores: unknown;
}

interface Consultation {
    id: string;
    company_id: string;
    summary: string | null;
    feedback: string | null;
}

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();

        // 1. 인증 확인
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. 역할 기반 권한 확인 (super_admin, service_operator, group_admin만 허용)
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, group_id')
            .eq('id', user.id)
            .single();

        const allowedRoles = ['super_admin', 'service_operator', 'group_admin'];
        if (!profile || !allowedRoles.includes(profile.role)) {
            return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
        }

        const { projectId } = await req.json();

        if (!projectId) {
            return NextResponse.json({ error: "projectId is required" }, { status: 400 });
        }

        // 3. 프로젝트 데이터 조회
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .select(`
        id,
        name,
        group_id,
        diagnosis_records (
          id,
          user_id,
          company_id,
          diag_type,
          scores
        ),
        consultations (
          id,
          company_id,
          summary,
          feedback
        )
      `)
            .eq('id', projectId)
            .single();

        if (projectError || !project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        // 4. group_admin은 자신의 그룹 프로젝트만 접근 가능
        if (profile.role === 'group_admin' && project.group_id !== profile.group_id) {
            return NextResponse.json({ error: "Forbidden: project does not belong to your group" }, { status: 403 });
        }

        // 5. 데이터 집계
        const records = project.diagnosis_records as DiagnosisRecord[];
        const consultations = project.consultations as Consultation[];

        const preDiagnoses = records.filter((d) => d.diag_type === 'pre');
        const postDiagnoses = records.filter((d) => d.diag_type === 'post');
        const summaries = consultations.map((c) => c.summary).filter(Boolean);

        const statsCache = {
            total_companies_pre: preDiagnoses.length,
            total_companies_post: postDiagnoses.length,
            consultation_summaries_count: summaries.length,
            // TODO: add detailed score averages
        };

        // 6. AI 생성 (Placeholder — 추후 LLM 연동)
        const aiInsight = "이 문장은 추후 OpenAI/Anthropic 통신 후 AI 작성 내용으로 교체됩니다. \n\n" +
            "사전 진단 기업 수: " + preDiagnoses.length + ", 사후 진단 기업 수: " + postDiagnoses.length +
            "\n수집된 전문가 요약: " + summaries.length + "건을 바탕으로 성장률 및 개선 사항이 분석될 예정입니다.";

        // 7. DB 저장
        const { data: report, error: reportError } = await supabase
            .from('reports')
            .insert({
                project_id: projectId,
                ai_insight: aiInsight,
                stats_cache: statsCache
            })
            .select()
            .single();

        if (reportError) {
            console.error("Failed to save report:", reportError);
            return NextResponse.json({ error: "Failed to save report to database" }, { status: 500 });
        }

        return NextResponse.json({ success: true, report });

    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Internal server error";
        console.error("Report generation error:", err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
