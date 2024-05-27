import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        global: 'window'
    },
    build: {
        outDir: 'build/admin'
    },
    resolve: {
        dedupe: ['react-router', 'react-router-dom', 'react-intl'],
        alias: [
            {
                find: /^~.+/,
                replacement: (val) => {
                    return val.replace(/^~/, "");
                },
            },
        ],
    },
});
