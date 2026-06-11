import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // Use absolute URL path for deployment (change to your domain)
  base: '/',

  plugins: [
    // Only use inspectAttr in dev mode — excluded from production builds
    react(),
  ],

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // Ensure CSS is inlined where appropriate for faster FCP
    cssCodeSplit: false,

    // Chunk splitting strategy for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js and its ecosystem — large library, changes infrequently
          three: ['three', '@react-three/fiber', '@react-three/drei'],

          // Animation libraries
          animation: ['gsap', 'framer-motion', 'lenis'],

          // UI component libraries
          vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
          ],

          // Radix UI primitives (many small packages)
          radix: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-slot',
            '@radix-ui/react-separator',
            '@radix-ui/react-switch',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-label',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-menubar',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-slider',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
          ],
        },
      },
    },

    // Generate source maps for production debugging (not for DPR, remove if privacy-critical)
    sourcemap: false,

    // Reduce CSS bloat
    minify: 'esbuild',
  },

  // Expose env variables with explicit prefix
  define: {
    __APP_NAME__: '"Rift Stories"',
    __APP_VERSION__: '"1.0.0"',
  },
});
