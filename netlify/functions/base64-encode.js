export async function handler(event) {
    try {
        const data = JSON.parse(event.body || '{}');
        const jsonString = JSON.stringify(data);
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