const Ably = require('ably/promises');
const ably = new Ably.Realtime.Promise({ key: process.env.ABLY_API_KEY });

module.exports = async ( event ) => {
    console.log("Received event in ably-webhook")
    console.log(event);

    // Check that the request is a POST request
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    // Parse the request body as JSON
    const body = JSON.parse(event.body);

    // Extract the Ably event type from the X-Ably-Action header
    const eventType = event.headers["X-Ably-Action"];

    // Extract the Ably channel name from the X-Ably-Channel header
    const channelName = event.headers["X-Ably-Channel"];

    // Extract the Ably message ID from the X-Ably-Message-Id header (if applicable)
    const messageId = event.headers["X-Ably-Message-Id"];

    // Validate the request signature using your Ably API key secret
    const signature = event.headers["X-Ably-Signature"];
    const payload = event.body;

    const isValid = ably.crypto.verifyHmac(payload, signature, process.env.ABLY_API_KEY);
    if (!isValid) {
        return {
            statusCode: 401,
            body: "Unauthorized"
        };
    }

    // Handle the Ably event based on its type
    switch (eventType) {
        case "publish":
            // Handle a new message being published on the channel
            const message = body.message;
            console.log(`New message published on ${channelName}: ${message}`);
            break;
        case "subscribe":
            // Handle a new client subscribing to the channel
            console.log(`New client subscribed to ${channelName}: ${body.clientId}`);
            break;
        case "unsubscribe":
            // Handle a client unsubscribing from the channel
            console.log(`Client unsubscribed from ${channelName}: ${body.clientId}`);
            break;
        default:
            // Handle unsupported event types
            console.warn(`Unsupported Ably event type: ${eventType}`);
    }

    // Return a successful response
    return {
        statusCode: 200,
        body: "OK"
    };
};
