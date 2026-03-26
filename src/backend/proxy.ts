/**
 * 2. proxy request to youtube (for video chunks)
 */

export async function handleProxy(req: Request, url: URL) {
    if (req.method === 'OPTIONS') {
        return new Response('', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            }
        });
    }

    const host = url.searchParams.get('__host');
    if (!host) {
        return new Response('Missing __host', { status: 400 });
    }

    const target = new URL(req.url);
    target.host = host;
    target.protocol = 'https:';
    target.port = '443';
    target.pathname = url.pathname.replace('/proxy', '');
    target.searchParams.delete('__host');

    const headers = new Headers();
    copyHeader('range', headers, req.headers);
    copyHeader('user-agent', headers, req.headers);

    const ytRes = await fetch(target.toString(), {
        method: req.method,
        headers,
        body: req.body
    });

    const resHeaders = new Headers();
    copyHeader('content-length', resHeaders, ytRes.headers);
    copyHeader('content-type', resHeaders, ytRes.headers);
    copyHeader('content-range', resHeaders, ytRes.headers);

    resHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(ytRes.body, {
        status: ytRes.status,
        headers: resHeaders
    });
}

function copyHeader(name: string, to: Headers, from: Headers) {
    const val = from.get(name);
    if (val) to.set(name, val);
}