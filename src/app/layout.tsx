/**
 * Root Layout — Next.js 14 App Router
 *
 * Unico punto in cui vengono caricati font e foglio di stile globale.
 * Lo styling è interamente Tailwind: nessun CSS monolitico, nessun Bootstrap.
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SITE_URL } from '../constants';
import { personalInfo, summary, metaDescription, skills, projects } from '../data/profileData';
import { WhatsAppFloat } from '../components/layout/WhatsAppFloat';
import { CookieBanner } from '../components/ui/CookieBanner';
import './globals.css';

// Font unico, self-hosted da next/font: zero richieste esterne a runtime.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${personalInfo.name} | ${personalInfo.role}`,
    template: `%s | ${personalInfo.name}`,
  },

  // Derivata dal data layer, non riscritta qui. Era una terza copia a mano
  // accanto a `summary` e `personalInfo.role`, e come tutte le copie a mano si
  // era fermata a un posizionamento precedente.
  description: metaDescription,

  keywords: [
    personalInfo.name,
    'Full Stack Developer',
    'Next.js',
    'TypeScript',
    'React',
    'Laravel',
    'PHP',
    'Portfolio',
    // Comune dal data layer, provincia e regione a seguire: chi cerca per
    // provincia trova comunque, senza che la keyword contraddica la pagina.
    personalInfo.city,
    'Agrigento',
    'Sicilia',
  ],

  authors: [{ name: personalInfo.name, url: SITE_URL }],
  creator: personalInfo.name,
  publisher: personalInfo.name,

  // Le immagini OpenGraph e Twitter sono generate da `opengraph-image.tsx`
  // (1200x630) e rilevate automaticamente da Next.js: nessuna icona quadrata.
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: `${SITE_URL}/`,
    siteName: `${personalInfo.name} — Portfolio`,
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.tagline,
  },

  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.tagline,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/Melo_icon.ico',
    apple: '/Melo_icon.png',
  },

  manifest: '/manifest.json',

  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  // Allineato al background reale del tema (Slate 950).
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Structured data derivati dal data layer invece che scritti a mano: se cambiano
 * skill o progetti, lo schema resta allineato (nella V1 dichiarava tecnologie e
 * progetti che non corrispondevano più al contenuto della pagina).
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: SITE_URL,
  jobTitle: personalInfo.role,
  description: summary,
  email: `mailto:${personalInfo.email}`,
  address: {
    '@type': 'PostalAddress',
    // Letto dal data layer: scritto a mano dichiarava una città diversa da
    // quella mostrata in pagina dopo ogni cambio di `personalInfo`.
    addressLocality: personalInfo.city,
    addressRegion: 'Sicilia',
    addressCountry: 'IT',
  },
  sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.instagram],
  knowsAbout: skills.map((skill) => skill.name),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${personalInfo.name} — Portfolio`,
  url: SITE_URL,
  inLanguage: 'it-IT',
  author: { '@type': 'Person', name: personalInfo.name },
  hasPart: projects.map((project) => ({
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
        {/* Fuori da `children` così restano visibili su ogni rotta, landing e pagine interne. */}
        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
