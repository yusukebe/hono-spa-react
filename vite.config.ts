import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import devServer from '@hono/vite-dev-server'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import pages from '@hono/vite-cloudflare-pages'
import {getPlatformProxy} from 'wrangler'

export default defineConfig(async ({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [viteReact(), TanStackRouterVite()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/api/, '/api'),
          }
        },
      },
    }
  } else {
    const { env, dispose } = await getPlatformProxy()
    return {
      plugins: [
        pages({
          entry: ['src/api/index.tsx'],
        }),
        devServer({
          entry: 'src/api/index.tsx',
          adapter: {
            env,
            onServerClose: dispose
          },
        })
      ],
      server: {
        port: 3000,
      },
    }
  }
})