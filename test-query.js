import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function test() {
    const profile = { stage: 'P', industry: 'I' }
    const stageIndustryCode = `${profile.stage}_${profile.industry}`;
    console.log("Testing query...")
    const { data: allQuestions, error } = await supabase
        .from('questions')
        .select('*')
        .or(`and(category.eq.stage,mapping_code.eq.${profile.stage}),and(category.eq.industry,mapping_code.eq.${stageIndustryCode}),and(category.eq.esg,mapping_code.eq.${profile.stage})`)

    if (error) {
        console.error("Error fetching questions:", error)
    } else {
        console.log(`Successfully fetched ${allQuestions.length} questions.`)
    }
}
test()
