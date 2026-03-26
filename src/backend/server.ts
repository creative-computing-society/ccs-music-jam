import { getStreamUrl } from './youtube.ts';
import { handleProxy } from './proxy.ts';

/**
 * server
 */
const server = Bun.serve({
    port: 8080,

    async fetch(req) {
        const url = new URL(req.url);

        // ---- /manifest ----
        if (url.pathname === '/manifest') {
            const id = url.searchParams.get('id');
            if (!id) {
                return new Response('Missing video id', { status: 400 });
            }

            try {
                const streamUrl = await getStreamUrl(id);
                console.log('USING STREAM:', streamUrl);

                return Response.json({ url: streamUrl });
            } catch (err) {
                console.error('STREAM ERROR:', err);
                return new Response('error', { status: 500 });
            }
        }

        // ---- /proxy ----
        if (url.pathname.startsWith('/proxy')) {
            return handleProxy(req, url);
        }

        return new Response('Not found', { status: 404 });
    }
});

console.log(`server running at ${server.url}`);