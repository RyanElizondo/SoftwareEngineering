const {openMongoConnection, successfulStripe, unsuccessfulStripe, pendingStripe, readOrder, deleteOrder} = require("../mongoCRUD");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async ({ body, headers }) => {
    try {
        // check the webhook to make sure it’s valid
        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );

        await openMongoConnection();

        // only do stuff if this is a successful Stripe Checkout purchase
        if (stripeEvent.type === 'checkout.session.completed') {
            const eventObject = stripeEvent.data.object;
            const items = eventObject.display_items;

            //TODO Send email to customer

        }

        switch(stripeEvent.type){
            case 'payment_intent.succeeded':
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    stripeEvent.id
                )
                successfulStripe(paymentIntent.id,paymentIntent.amount);
                break;
            default:
                // unexpected event AKA fail payment
                const paymentFail = await stripe.paymentIntents.retrieve(
                    stripeEvent.id
                )
                unsuccessfulStripe(paymentFail.id,paymentFail.amount);
                let testing = pendingStripe(paymentFail.client_secret);
                const createdOrder = readOrder(testing);
                deleteOrder(createdOrder);
                console.log(testing);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ received: true }),
        };
    } catch (err) {
        console.log(`Stripe webhook failed with ${err}`);

        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    }
};