import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Note: This requires the service_role key to bypass RLS or at least read from auth.
// But since we don't have service_role, we will try to insert known test users manually 
// or hope the anon key can insert if the RLS allows (which it might not for random IDs).
// Given the constraints, I will create a script that attempts to create profiles for the main test accounts.

const supabase = createClient(supabaseUrl, supabaseKey)

const testUsers = [
    { id: '10000000-0000-0000-0000-000000000000', email: 'admin@bizdive.com', user_name: '최고관리자', role: 'super_admin' },
    { id: '4e15fffc-6fcd-4232-838d-9f2b2913fcbb', email: 'admin@test.com', user_name: '기관관리자', role: 'group_admin' },
    { id: 'cb6289d0-852e-4b4e-ba54-c222ba3937db', email: 'company1_test@example.com', user_name: '테스트 참가 기업 1', role: 'user' }
]

async function sync() {
    console.log("Starting manual sync for known test users...")
    
    for (const user of testUsers) {
        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            email: user.email,
            user_name: user.user_name,
            role: user.role,
            updated_at: new Date()
        })
        
        if (error) {
            console.error(`Error syncing ${user.email}:`, error.message)
        } else {
            console.log(`Successfully synced ${user.email}`)
        }
    }
}

sync()
