import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Feature: reactStrictMode
  reactStrictMode: true,

  // Feature: images.remotePatterns & images.domains
  images: {
    // Kept your specific remotePatterns from the original config
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'argusnewdashboard.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'uat-argusnewdashboard.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
        pathname: '/argusnewdashboard/**',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
        pathname: '/uat-argusnewdashboard/**',
      },
      {
        protocol: 'https',
        hostname: 'baliyatra.argusnews.in',
      },
      {
        protocol: 'https',
        hostname: 'argusnews.in',
      },
      {
        protocol: 'https',
        hostname: 'www.argusnews.in',
      },
      {
        protocol: 'https',
        hostname: 'argusenglish.in',
      },
      {
        protocol: 'https',
        hostname: 'www.argusenglish.in',
      },
      {
        protocol: 'https',
        hostname: 'uat.argusnews.in',
      },
      {
        protocol: 'https',
        hostname: 'www.uat.argusnews.in',
      },
      {
        protocol: 'https',
        hostname: 'uat.argusenglish.in',
      },
      {
        protocol: 'https',
        hostname: 'www.uat.argusenglish.in',
      },
      {
        protocol: 'https',
        hostname: 'sb.scorecardresearch.com',
      },
    ],
    // Added domains from your new feature request
    domains: [
      "argusnews.in",
      "www.argusnews.in",
      // Add other CDN or external domains if needed
    ],

    // Kept other specific image settings from your original config
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    unoptimized: false, // Enable image optimization in all environments

    // Re-enable critical image optimization settings for better Core Web Vitals
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // Cache optimized images for 24 hours
    qualities: [70, 75, 85, 90, 100], // Configure image qualities
  },

  // Kept custom fetch configuration from your original config
  env: {
    NEXT_IMAGE_TIMEOUT: '15000', // 15 second timeout
    NEXT_IMAGE_RETRY_COUNT: '3',
  },

  // Enable SWC minification for better performance (deprecated in Next.js 15, enabled by default)
  // swcMinify: true,

  // Feature: experimental.optimizePackageImports
  experimental: {
    optimizePackageImports: ["lucide-react", "date-fns", "lodash", "@/components"],
    optimizeCss: true,
    // Enable faster builds (deprecated, use turbopack instead)
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
  },

  // Enable compression
  compress: true,

  // Disable trailing slashes for cleaner URLs
  trailingSlash: false,

  // Power-only mode for better performance
  poweredByHeader: false,

  // Module optimization
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Enhanced webpack config for performance
  webpack(config, { dev, isServer }) {
    // Disable webpack cache in dev to avoid snapshot errors
    if (dev) {
      config.cache = false;
    }
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        // Separate vendor chunks
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // Separate React and Next.js
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
          name: 'framework',
          chunks: 'all',
          priority: 20,
        },
        // Separate large libraries
        lib: {
          test: /[\\/]node_modules[\\/](lodash|date-fns|lucide-react)[\\/]/,
          name: 'lib',
          chunks: 'all',
          priority: 30,
        },
      };
    }

    // Add performance hints
    if (!dev) {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 512KB
        maxAssetSize: 512000, // 512KB
      };
    }

    // Add compression
    if (!isServer) {
      // ModuleConcatenationPlugin is enabled by default in production builds
      // config.optimization.minimizer = [
      //   ...config.optimization.minimizer,
      //   new webpack.optimize.ModuleConcatenationPlugin(),
      // ];
    }

    return config;
  },

  // Feature: rewrites
  async rewrites() {
    return [
      {
        source: "/app",
        destination: "/page-app",
      },
    ];
  },

  // Feature: headers
  async headers() {
    return [
      // DNS prefetch and preconnect for critical origins
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Link', value: '<https://argusnewdashboard.s3.ap-south-1.amazonaws.com>; rel=preconnect' },
          { key: 'Link', value: '<https://fonts.googleapis.com>; rel=preconnect; crossorigin' },
          { key: 'Link', value: '<https://fonts.gstatic.com>; rel=preconnect; crossorigin' },
          { key: 'Link', value: '<https://www.googletagmanager.com>; rel=preconnect' },
          // Preload critical fonts
          { key: 'Link', value: '<https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap>; rel=preload; as=style' },
        ],
      },
      // Font optimization headers
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // More specific asset caching (replaces original /assets/*)
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|ttf|otf)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // CSS and JS caching
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Kept specific headers from your original config
      {
        source: '/_next/image',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400' },
        ],
      },
      {
        source: '/api/image-proxy',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
      // API caching headers
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=60, stale-while-revalidate=30",
          },
        ],
      },
      // General security headers
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          // Removed X-Frame-Options to allow YouTube embeds (CSP frame-ancestors handles this)
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          // Removed Cross-Origin-Embedder-Policy to allow YouTube embeds
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
      // Content Security Policy
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
                  "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; style-src * data: blob: 'unsafe-inline'; img-src * data: blob:; connect-src * data: blob:; font-src * data: blob:; frame-src * data: blob:; media-src * data: blob:;",
            ].join("; ")
          }
        ],
      },
    ];
  },

  // Feature: redirects
  async redirects() {
    return [
      // Redirect www.argusnews.in to argusnews.in
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.argusnews.in",
          },
        ],
        destination: "https://argusnews.in/:path*",
        permanent: true,
      },
      // Redirect www.argusenglish.in to argusenglish.in
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.argusenglish.in",
          },
        ],
        destination: "https://argusenglish.in/:path*",
        permanent: true,
      },
    ];
  },
};

// Feature: PWA
const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // Optimize service worker
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/argusnewdashboard\.s3\.ap-south-1\.amazonaws\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'argus-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/www\.googletagmanager\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'gtm',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
        },
      },
    },
  ],
});

export default withPWA(nextConfig);

