// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

// site нужен, чтобы sitemap и canonical-ссылки собирались с абсолютным адресом.
// Главный адрес без www: www и nevarium1.vercel.app уводят на него редиректом
// в настройках доменов Vercel. Адреса без слеша на конце, как и ссылки в меню;
// сами редиректы для слеша и .html заданы в vercel.json.
export default defineConfig({
  site: 'https://nevarium-lab.ru',
  trailingSlash: 'never',
  integrations: [react(), sitemap()],
  server: { port: Number(process.env.PORT) || 5173 },
})
