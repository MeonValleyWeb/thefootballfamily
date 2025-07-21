export async function handler(event) {
    try {
        const body = JSON.parse(event.body || '{}');

        // Defensive check
        if (!body.articles || !Array.isArray(body.articles)) {
            throw new Error('Missing or invalid articles array');
        }

        const jsonString = JSON.stringify(body.articles);
        const base64 = Buffer.from(jsonString).toString('base64');

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ base64 })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to encode.', details: err.message })
        };
    }
}