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
    const { data: profiles, error } = await supabase.from('profiles').select('*')
    console.log("Profiles count:", profiles?.length)
    console.log("Profiles:", profiles)
}

test()
