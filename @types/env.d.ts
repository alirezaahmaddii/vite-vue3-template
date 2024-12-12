/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string,
    readonly VITE_APP_API_BANNER: string,
    readonly VITE_APP_BASE: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
