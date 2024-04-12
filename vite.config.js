import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'https://localhost:3000',
            'ws' : {
                target: 'ws://localhost:3000',
                ws: true,
            },
        },
    },
});