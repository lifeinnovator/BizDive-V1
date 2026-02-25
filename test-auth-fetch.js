import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function runTest() {
    console.log("Logging in as test2@test.com...")
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test2@test.com',
        password: '1234321'
    })

    if (error) {
        console.error("Login failed:", error.message)
        return
    }

    console.log("Login success! Fetching a record ID...")

    // Get a record ID for this user
    const { data: records, error: dbError } = await supabase
        .from('diagnosis_records')
        .select('id')
        .eq('user_id', data.user.id)
        .limit(1)

    if (dbError || !records || records.length === 0) {
        console.error("No records found for user or db error:", dbError)
        return
    }

    const recordId = records[0].id
    console.log("Found record ID:", recordId)

    // Now make a fetch request to the local dev server using the session cookie
    const sessionPaths = [
        `sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token=${encodeURIComponent(JSON.stringify([data.session.access_token, data.session.refresh_token, null, null, null]))}`
    ]

    console.log("Fetching http://localhost:3000/report/" + recordId)
    try {
        const response = await fetch(`http://localhost:3000/report/${recordId}`, {
            redirect: 'manual',
            headers: {
                Cookie: sessionPaths.join('; ')
            }
        })

        console.log("Response Status:", response.status)
        if (response.status >= 300 && response.status < 400) {
            console.log("Redirected to:", response.headers.get('location'))
        }
    } catch (e) {
        console.error("Fetch failed:", e)
    }
}

runTest()
