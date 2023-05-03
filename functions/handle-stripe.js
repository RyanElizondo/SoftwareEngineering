const {openMongoConnection, successfulStripe, unsuccessfulStripe, addPoints, removeInventory} = require("./mongoNETLIFY");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    
    openMongoConnection();
    const bodyObj = JSON.parse(event.body);
    const clientSecret = bodyObj.data.object.client_secret
    const amount = bodyObj.data.object.amount;

    let status = 200;
    let bodyMessage;

    try {
                
        switch(bodyObj.type){
            case 'payment_intent.succeeded':{

                successfulStripe(clientSecret, amount); 

                bodyMessage = JSON.stringify("Payment Successful")
                break;
            }
            case 'payment_intent.payment_failed':{

                await unsuccessfulStripe(clientSecret);
                
                bodyMessage = JSON.stringify("Payment failed")
                break;
            }
            default:{
                status = 405;
                bodyMessage = JSON.stringify({ message: 'Method Not Allowed' });
                break;
            };

        }
        return {
            statusCode: status,
            body: bodyMessage
        };
    } catch (err) {
        console.log(`Stripe webhook failed with ${err}`);

        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    }

};