// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // 🖼️ IMAGE OPTIMIZATION (Mobile-First Strategy)
  // ============================================
  images: {
    // Domini esterni consentiti
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    // ⚡ Ottimizzazione Dev Mode: disabilita ottimizzazione in dev per velocità
    unoptimized: process.env.NODE_ENV === 'development',
    
    // 🚀 Formati moderni: AVIF (migliore compressione) + WebP fallback
    // AVIF: ~50% più piccolo di WebP, supportato su Chrome 85+, Firefox 93+
    formats: ['image/avif', 'image/webp'],
    
    // 📱 Device sizes mobile-first (ordine crescente per srcset)
    // Ottimizzato per viewport comuni: 320, 375, 414, 768, 1024, 1440
    deviceSizes: [320, 480, 640, 768, 1024, 1200, 1920],
    
    // 🎨 Image sizes per icone e thumbnails
    imageSizes: [16, 32, 48, 64, 80, 96, 128, 256],
    
    // ⚡ Minimizza numero di immagini generate in produzione
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 giorni cache
  },

  // ============================================
  // ⚡ PERFORMANCE OPTIMIZATIONS
  // ============================================
  
  // Abilita compilazione incrementale più veloce
  experimental: {
    // Ottimizza i package imports per bundle più piccoli
    optimizePackageImports: ['lucide-react'],
  },

  // Abilita SWC minifier (più veloce di Terser)
  swcMinify: true,

  // Riduci il logging in dev
  logging: {
    fetches: {
      fullUrl: false,
    },
  },

  // ============================================
  // 🔄 REDIRECTS & HEADERS
  // ============================================
  
  // Redirect per compatibilità con vecchi URL se necessario
  async redirects() {
    return [];
  },
  
  // Headers per sicurezza e SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
