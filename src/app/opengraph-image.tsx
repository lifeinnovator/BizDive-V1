import { ImageResponse } from 'next/og'

export const alt = 'BizDive - 7D 기업경영 심층자가진단'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '24px solid #4f46e5',
                }}
            >
                {/* Content Container with a lot of padding to prevent cropping in 1:1 ratios like KakaoTalk */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        width: '80%',
                        height: '80%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '140px',
                            fontFamily: 'sans-serif',
                            fontWeight: 800,
                            color: '#1e1b4b',
                            letterSpacing: '-0.05em',
                        }}
                    >
                        BizDive.
                    </div>
                    <div
                        style={{
                            fontSize: '48px',
                            fontFamily: 'sans-serif',
                            color: '#4f46e5',
                            marginTop: '50px',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        7D 기업경영 심층자가진단
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '40px',
                        }}
                    >
                        <div style={{ fontSize: '32px', fontFamily: 'sans-serif', color: '#64748b', fontWeight: 500, lineHeight: 1.5 }}>
                            조직의 현황을 입체적으로 진단하고
                        </div>
                        <div style={{ fontSize: '32px', fontFamily: 'sans-serif', color: '#64748b', fontWeight: 500, lineHeight: 1.5 }}>
                            가장 빠르고 냉정하게 솔루션을 도출하세요.
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
