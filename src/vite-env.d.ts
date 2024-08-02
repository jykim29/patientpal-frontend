/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_KEY: string;
  readonly VITE_BACKEND_BASE_URL: string;
  readonly VITE_BACKEND_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
