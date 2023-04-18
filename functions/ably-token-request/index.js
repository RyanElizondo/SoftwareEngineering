const Ably = require('ably/promises');
const ably = new Ably.Realtime.Promise({ key: process.env.ABLY_API_KEY });

exports.handler = async function handler(event, context, callback) {
    if(event.httpMethod === 'OPTIONS') {
        /* TODO update access-control-allow-origin when merging to main */
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400' // 24 hours
            },
            body: ''
        }
    }
    console.log("received CONNECT TO ABLY!")
    if (!process.env.ABLY_API_KEY) {
        return {
            statusCode: 500,
            headers: { "content-type": "application/json" },
            body: JSON.stringify(`Missing ABLY_API_KEY environment variable.`)
        }
    }

    const clientId = event.queryStringParameters["clientId"] || process.env.DEFAULT_CLIENT_ID || "NO_CLIENT_ID";
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: clientId });

    return {
        statusCode: 200,
        headers: {
            "content-type": "application/json",
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400' // 24 hours
        },
        body: JSON.stringify(tokenRequestData)
    };

}