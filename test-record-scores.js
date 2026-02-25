import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: 'test2@test.com',
        password: '1234321'
    })

    if (authErr) { console.error(authErr); return }
    const userId = data.user.id;

    const { data: record, error } = await supabase
        .from('diagnosis_records')
        .select(`id, dimension_scores, total_score`)
        .eq('user_id', userId)
        .limit(1)
        .single()

    console.log("Error:", error)
    console.log("Record:", record)

    try {
        const dimensionScores = record?.dimension_scores || {}
        const keys = Object.keys(dimensionScores)
        console.log("Keys:", keys)
    } catch (e) {
        console.log("Exception when calling Object.keys:", e.message)
    }
}
test()
