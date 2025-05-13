import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { IncomingMessage, ServerResponse } from 'http';

const app = express();
const PORT = 3002;
const API_TARGET = 'https://api.jotsu.com/1';

const proxyMiddleware = createProxyMiddleware<IncomingMessage, ServerResponse>({
    target: API_TARGET,
    changeOrigin: true,
    on: {
        proxyRes(proxyRes) {
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies) {
                proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
                    cookie
                        .replace(/Domain=[^;]+;?/i, '')
                        .replace(/Path=[^;]+/i, 'Path=/api/auth')
                        .replace(/;?\s*SameSite=[^;]+/i, '; SameSite=Strict')
                        .replace(/;?\s*Secure/i, ''),
                );
            }
        },
    },
    logger: console,
});

app.use(['/api'], proxyMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
