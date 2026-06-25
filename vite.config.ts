import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src/frontend',
    server: {
        port: 5173,
        proxy: {
            '/manifest': 'http://localhost:8080',
            '/proxy': 'http://localhost:8080',
        },
    },
});