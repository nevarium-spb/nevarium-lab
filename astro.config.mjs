// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

// site нужен, чтобы sitemap и canonical-ссылки собирались с абсолютным адресом.
// Прод отдаётся и на nevarium-lab.ru, и на www — канонический адрес без www.
export default defineConfig({
  site: 'https://nevarium-lab.ru',
  integrations: [react(), sitemap()],
  server: { port: Number(process.env.PORT) || 5173 },
})
