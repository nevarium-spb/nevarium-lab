/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Адрес CRM, куда уходят заявки. По умолчанию — прод. */
  readonly VITE_CRM_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
