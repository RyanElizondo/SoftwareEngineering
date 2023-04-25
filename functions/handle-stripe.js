<<<<<<< HEAD
const { sendContactForm } = require("./send-email");
const {openMongoConnection, successfulStripe, unsuccessfulStripe, pendingStripe, readOrder, deleteOrder,
    closeMongoConnection
} = require("./mongoNETLIFY");
=======
const {openMongoConnection, successfulStripe, unsuccessfulStripe, addPoints, removeInventory} = require("./mongoNETLIFY");
>>>>>>> c31360e8fa889283228447937543cf1860076f0b
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

openMongoConnection();

exports.handler = async (event, context) => {
    
    const body = event.body;
    //if(event.httpMethod === "POST") {

        try {

            // check the webhook to make sure it’s valid
            /*const stripeEvent = stripe.webhooks.constructEvent(
                body,
                event.headers['stripe-signature'],
                process.env.STRIPE_WEBHOOK_SECRET
            );*/

            const stripeEvent = event;
            const bodyObj = JSON.parse(body);
            const clientSecret = bodyObj.data.object.client_secret
            const amount = bodyObj.data.object.amount;
            switch(bodyObj.type){
                case 'payment_intent.succeeded':

                    console.log("calling successful stripe")
<<<<<<< HEAD
                    await successfulStripe(clientSecret,amount);
                    await sendContactForm(amount);
                    console.log("Email sent");
=======
                    await successfulStripe(clientSecret,amount); //TODO check if sending valid clientSecret

>>>>>>> c31360e8fa889283228447937543cf1860076f0b
                    //TODO send email to customer that order is received.

                    //TODO update user's points and order history after successful payment using Mongo functions to update Users collection
                    await addPoints(clientSecret, amount); //update order status
                    //TODO update menu database using Mongo functions to update Menu collection
                    await removeInventory(clientSecret, amount); //update order status
                    break;
                case 'payment_intent.payment_failed':
                    // unexpected event AKA fail payment
                    await unsuccessfulStripe(clientSecret);

                    //TODO send email to customer that order is received.

                    break;
                default:
                    break;
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
<<<<<<< HEAD
        } finally {
           //await closeMongoConnection();
=======
>>>>>>> c31360e8fa889283228447937543cf1860076f0b
        }

    /*} else {
        return {
            statusCode: 405,
            headers: {
                "Allow": "POST"
            },
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        }
    }*/

};