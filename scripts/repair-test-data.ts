const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Scoring Configuration (Synced with src/lib/scoring-utils.ts)
const STAGE_MAX_SCORES = {
    P: { D1: 20, D2: 25, D3: 15, D4: 10, D5: 10, D6: 10, D7: 10 },
    E: { D1: 15, D2: 15, D3: 25, D4: 15, D5: 10, D6: 10, D7: 15 },
    V: { D1: 10, D2: 10, D3: 15, D4: 20, D5: 15, D6: 15, D7: 25 },
    M: { D1: 10, D2: 10, D3: 10, D4: 15, D5: 25, D6: 20, D7: 10 }
}

async function repairTestData() {
    console.log("🚀 Starting Test Data Repair...")
    console.log("DB URL:", supabaseUrl)

    const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
    
    if (countError) {
        console.error("❌ Count Error:", countError)
    } else {
        console.log("Total profiles in DB:", count)
    }

    // 1. Get all test users (Simple query first to debug)

    const { data: testUsers, error: userError } = await supabase
        .from('profiles')
        .select('id, email, stage, company_name')

    if (userError) {
        console.error("❌ Error fetching users:", userError)
        return
    }

    const filteredUsers = testUsers.filter(u => 
        (u.email && u.email.toLowerCase().includes('test')) || 
        (u.company_name && u.company_name.includes('테스트')) ||
        (u.company_name && u.company_name.includes('company'))
    )

    console.log(`Found ${testUsers.length} total users. Filtered to ${filteredUsers.length} test users.`)

    for (const user of filteredUsers) {

        // 2. Get records for this user
        const { data: records, error: recordError } = await supabase
            .from('diagnosis_records')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true })

        if (recordError) {
            console.error(`❌ Error fetching records for ${user.email}:`, recordError)
            continue
        }

        if (!records || records.length === 0) continue

        console.log(`\nProcessing ${user.email} (${user.company_name}) - ${records.length} records`)

        const userStage = user.stage || 'P'
        const maxScores = STAGE_MAX_SCORES[userStage] || STAGE_MAX_SCORES['P']
        
        // Logical score target based on round (ascending)
        const roundTargets = [50, 65, 80, 90, 95]

        for (let i = 0; i < records.length; i++) {
            const record = records[i]
            const roundNum = i + 1
            const targetTotal = roundTargets[Math.min(i, roundTargets.length - 1)] + (Math.random() * 5 - 2.5)
            
            const newDimensionScores = {}
            let actualSum = 0

            Object.entries(maxScores).forEach(([dim, max]) => {
                const dimPercentage = targetTotal + (Math.random() * 10 - 5)
                const clampedPercentage = Math.max(0, Math.min(100, dimPercentage))
                const earned = Math.round((clampedPercentage / 100) * max * 10) / 10
                
                newDimensionScores[dim] = Math.round((earned / max) * 1000) / 10
                actualSum += earned
            })

            const finalTotal = Math.round(actualSum * 10) / 10

            console.log(`  Round ${roundNum}: ${record.total_score} -> ${finalTotal}`)

            // 3. Update record
            const { error: updateError } = await supabase
                .from('diagnosis_records')
                .update({
                    round: roundNum,
                    total_score: finalTotal,
                    dimension_scores: newDimensionScores
                })
                .eq('id', record.id)

            if (updateError) {
                console.error(`  ❌ Error updating record ${record.id}:`, updateError)
            } else {
                console.log(`  ✅ Successfully updated record ${record.id}`)
            }
        }
    }

    console.log("\n✨ Data Repair Complete!")
}

repairTestData()

