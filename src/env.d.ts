/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENDPOINT: string;
    readonly VITE_HOME_URL: string;
    readonly VITE_NAME: string;
    readonly VITE_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}