import fs from 'fs/promises';

export async function POST({ request }) {
    const data = await request.json();

    // Only keep the first 20 articles
    const trimmed = data.slice(0, 20);

    await fs.writeFile('./src/data/news.json', JSON.stringify(trimmed, null, 2));

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}