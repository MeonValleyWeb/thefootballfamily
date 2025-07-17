import type { APIRoute } from 'astro';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        // Validate the incoming data
        if (!Array.isArray(body)) {
            return new Response(JSON.stringify({ error: 'Invalid data format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Write to the news.json file
        const newsPath = join(process.cwd(), 'src', 'data', 'news.json');
        await writeFile(newsPath, JSON.stringify(body, null, 2));

        return new Response(JSON.stringify({ success: true, count: body.length }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error updating news:', error);
        return new Response(JSON.stringify({ error: 'Failed to update news' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const GET: APIRoute = async () => {
    return new Response('News update endpoint - use POST with JSON data', {
        status: 200,
    });
};