'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function deleteRecordAction(recordId: string) {
    if (!recordId) {
        return { success: false, error: '유효하지 않은 레코드 정보입니다.' }
    }

    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return { success: false, error: '로그인이 필요합니다.' }
        }

        // Only delete the record if it belongs to the authenticated user
        const { error } = await supabase
            .from('diagnosis_records')
            .delete()
            .eq('id', recordId)
            .eq('user_id', user.id)

        if (error) {
            // 내부 DB 오류는 서버 로그에만 기록하고 클라이언트에는 일반 메시지 반환
            console.error('[DELETE_ERROR] Supabase Error:', {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint,
                recordId,
                userId: user.id
            })
            return { success: false, error: '삭제 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }
        }

        revalidatePath('/dashboard')
        return { success: true }
    } catch (e) {
        console.error('Delete action exception:', e)
        return { success: false, error: '서버 오류가 발생했습니다.' }
    }
}
