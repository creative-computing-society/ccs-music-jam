import { Innertube } from 'youtubei.js/web';

const innertube = await Innertube.create({
    fetch: (input, init) =>
        fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                'user-agent': 'Mozilla/5.0'
            }
        })
});

/**
 * 1. get stream url from youtube
 */
export async function getStreamUrl(videoId: string) {
    const info = await innertube.getInfo(videoId, { client: 'ANDROID' });

    if (!info.streaming_data) {
        throw new Error('No streaming data');
    }

    for (const format of info.streaming_data.formats) {
        try {
            const url = await format.decipher();
            if (url) return url;
        } catch {
            // ignore broken formats
        }
    }

    throw new Error('No working stream found');
}