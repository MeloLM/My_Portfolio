/**
 * OpenGraph image generata a build time (1200x630).
 *
 * Sostituisce l'icona quadrata 512x512 che la V1 serviva a Twitter/LinkedIn con
 * `summary_large_image`, producendo anteprime tagliate. Next.js rileva questo file
 * automaticamente e popola sia `og:image` sia `twitter:image`.
 */

import { ImageResponse } from 'next/og';
import { personalInfo } from '../data/profileData';

// Runtime edge: il percorso Node di @vercel/og fallisce su Windows in fase di
// prerender (fileURLToPath su path con drive letter).
export const runtime = 'edge';

export const alt = `${personalInfo.name} — ${personalInfo.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#020617',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.22), transparent 70%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 26,
            color: '#3b82f6',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 48, height: 3, backgroundColor: '#3b82f6' }} />
          {personalInfo.role}
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          {personalInfo.name}
        </div>

        <div style={{ marginTop: 28, fontSize: 34, color: '#94a3b8' }}>
          {personalInfo.tagline}
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            fontSize: 26,
            color: '#64748b',
          }}
        >
          {personalInfo.location}
        </div>
      </div>
    ),
    size
  );
}
