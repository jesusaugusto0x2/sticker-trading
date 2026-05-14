import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Cromos Mundial 2026';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f1117',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding: '0 80px',
        }}
      >
        <div style={{ fontSize: 56, color: '#22c55e', fontWeight: 900, letterSpacing: '-1px' }}>
          ⚽ Cromos Mundial 2026
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 1.4 }}>
          Encuentra fans con los cromos que te faltan y ofrece tus repetidos.
        </div>
      </div>
    ),
    { ...size }
  );
}
