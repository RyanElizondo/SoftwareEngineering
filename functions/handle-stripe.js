const {openMongoConnection, successfulStripe, unsuccessfulStripe, addPoints, removeInventory} = require("./mongoNETLIFY");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

openMongoConnection();

exports.handler = async (event, context) => {
    
    const body = event.body;
    console.log(body)
        try {

            //const stripeEvent = event;
            const bodyObj = JSON.parse(body);
            const clientSecret = bodyObj.data.object.client_secret
            const amount = bodyObj.data.object.amount;
            switch(bodyObj.type){
                case 'payment_intent.succeeded':

                    console.log("calling successful stripe")
                    console.log("STRIPE BODY");
                    console.log(bodyObj)
                    await successfulStripe(clientSecret,amount); //TODO check if sending valid clientSecret

                    //update menu database using Mongo functions to update Menu collection
                    //TODO TEST this call
                    await removeInventory(clientSecret); //update order status
                    
                    //TODO send email to customer that order is received.

                    //update user's points and order history after successful payment using Mongo functions to update Users collection
                    //TODO TEST this call
                    //await addPoints(clientSecret, amount); //update order status

                    

                    break;
                case 'payment_intent.payment_failed':
                    // unexpected event AKA fail payment
                    await unsuccessfulStripe(clientSecret);

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
        }

};