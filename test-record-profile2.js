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
        .select(`
            id,
            user_id,
            profiles (
                user_name,
                company_name,
                stage,
                industry,
                group_id
            )
        `)
        .eq('user_id', userId)
        .limit(1)
        .single()

    console.log("Error:", error)
    console.log("Record ID:", record?.id)
    console.log("Record profiles data type:", Array.isArray(record?.profiles) ? "Array" : typeof record?.profiles)
    console.log("Record profiles:", JSON.stringify(record?.profiles, null, 2))
}
test()
