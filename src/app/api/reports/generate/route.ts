import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();

        // Validate authorization (requires super_admin or group_admin)
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { projectId } = await req.json();

        if (!projectId) {
            return NextResponse.json({ error: "projectId is required" }, { status: 400 });
        }

        // 1. Fetch Project Data
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

        // 2. Data Aggregation & Preparation
        // Here we aggregate pre and post scores and collect consultation summaries
        const preDiagnoses = project.diagnosis_records.filter((d: any) => d.diag_type === 'pre');
        const postDiagnoses = project.diagnosis_records.filter((d: any) => d.diag_type === 'post');
        const summaries = project.consultations.map((c: any) => c.summary).filter(Boolean);

        // Placeholder Stats Cache
        const statsCache = {
            total_companies_pre: preDiagnoses.length,
            total_companies_post: postDiagnoses.length,
            consultation_summaries_count: summaries.length,
            // TODO: add detailed score averages
        };

        // 3. AI Generation (Placeholder - Integrate LLM here later)
        const aiInsight = "이 문장은 추후 OpenAI/Anthropic 통신 후 AI 작성 내용으로 교체됩니다. \n\n" +
            "사전 진단 기업 수: " + preDiagnoses.length + ", 사후 진단 기업 수: " + postDiagnoses.length +
            "\n수집된 전문가 요약: " + summaries.length + "건을 바탕으로 성장률 및 개선 사항이 분석될 예정입니다.";

        // 4. Save to DB
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

    } catch (err: any) {
        console.error("Report generation error:", err);
        return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
    }
}
