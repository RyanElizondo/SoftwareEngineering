import { buffer } from "micro";
import Stripe from "stripe";
import { openMongoConnection, closeMongoConnection,pendingStripe,readOrder,deleteOrder,unsuccessfulStripe,successfulStripe} from 'mongoCRUD'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    openMongoConnection();

    switch(event.type){
        case 'payment_intent.succeeded':
            const paymentIntent = await stripe.paymentIntents.retrieve(
                event.id
            )
            successfulStripe(paymentIntent.id,paymentIntent.amount);
            break;
        default:
            // unexpected event AKA fail payment
            const paymentFail = await stripe.paymentIntents.retrieve(
                event.id
            )
            unsuccessfulStripe(paymentFail.id,paymentFail.amount);
            testing = pendingStripe(paymentFail.client_secret);
            const createdOrder = readOrder(testing);
            deleteOrder(createdOrder);
            console.log(testing);
    }

    closeMongoConnection();

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;