export async function handler(event) {
    try {
        const { articles } = JSON.parse(event.body || '{}');

        if (!articles) {
            throw new Error('Missing articles array');
        }

        const jsonString = JSON.stringify(articles);
        const encoded = Buffer.from(jsonString).toString('base64');

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64: encoded })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to encode.' })
        };
    }
}