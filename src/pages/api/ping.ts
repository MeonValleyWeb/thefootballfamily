import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
    return new Response('pong', {
        status: 200,
    });
};