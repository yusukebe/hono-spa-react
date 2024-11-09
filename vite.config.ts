import build from '@hono/vite-build/cloudflare-workers'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './src/client.tsx',
          output: {
            entryFileNames: 'static/client.js'
          }
        }
      }
    }
  } else {
    return {
      ssr: {
        external: ['react', 'react-dom']
      },
      plugins: [
        build({
          outputDir: 'server-build'
        }),
        devServer({
          adapter,
          entry: 'src/index.tsx'
        })
      ]
    }
  }
})
