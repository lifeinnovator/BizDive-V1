import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase-server';

// SMTP Configuration (Hiworks / Gabia)
const SMTP_HOST = process.env.SMTP_HOSTNAME || 'smtps.hiworks.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
const SMTP_USER = process.env.SMTP_USERNAME; // admin@bizdive.kr
const SMTP_PASS = process.env.SMTP_PASSWORD; // App Password

export async function POST(req: Request) {
    try {
        // Authentication check — only logged-in users may trigger notifications
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { record } = body;

        if (!record) {
            return NextResponse.json({ error: 'No record found' }, { status: 400 });
        }

        const {
            company_name,
            contact_name,
            contact_phone,
            contact_email,
            topics,
            message,
        } = record;

        // If credentials are missing, log and simulate success (for now)
        if (!SMTP_USER || !SMTP_PASS) {
            console.warn('--- EMAIL NOTIFICATION SIMULATION (MISSING SMTP CREDENTIALS) ---');
            console.log('To: admin@bizdive.kr');
            console.log('Record:', record);

            return NextResponse.json({ success: true, simulated: true });
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const topicLabels: Record<string, string> = {
            business_strategy: '비즈니스 모델 및 전략',
            funding: '투자 유치 및 자금 조달',
            marketing: '마케팅 및 영업',
            hr_org: '인사 및 조직 관리',
            product: '제품 개발 및 기술',
            other: '기타',
        };

        const formattedTopics = topics
            ? topics.map((t: string) => topicLabels[t] || t).join(', ')
            : '없음';

        const mailOptions = {
            from: `"BizDive Admin" <${SMTP_USER}>`,
            to: 'admin@bizdive.kr',
            subject: `[BizDive] 새로운 전문가 매칭 신청: ${company_name}`,
            text: `신규 상담 신청이 접수되었습니다.

[신청 정보]
- 기업명: ${company_name}
- 담당자: ${contact_name}
- 연락처: ${contact_phone}
- 이메일: ${contact_email}
- 신청분야: ${formattedTopics}

[상담 내용]
${message || '내용 없음'}

관리자 페이지에서 상세 내용을 확인해 주세요.
https://admin.bizdive.kr/ops/consultations`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error sending email via Nodemailer:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
