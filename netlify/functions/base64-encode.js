export async function handler(event) {
    try {
        const body = JSON.parse(event.body || '{}');

        if (!Array.isArray(body.articles)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Invalid body format',
                    receivedType: typeof body.articles,
                    rawBody: body
                })
            };
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