import fs from 'fs/promises';

export async function POST({ request }) {
    try {
        const data = await request.json();
        const trimmed = Array.isArray(data) ? data.slice(0, 20) : [];
        await fs.writeFile('./src/data/news.json', JSON.stringify(trimmed, null, 2));
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}