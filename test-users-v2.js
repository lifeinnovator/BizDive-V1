import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing supabase env")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    console.log("Connecting to:", supabaseUrl)
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) {
        console.error("Error fetching profiles:", error)
    } else {
        console.log("Profiles count:", data?.length)
        if (data && data.length > 0) {
            console.log("First user:", data[0].user_name || data[0].email)
        }
    }
}

test()
