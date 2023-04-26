//import {loadUserOrder} from "@/lib/load-user-order";
import UserOrderItemsList from "@/components/UserOrderItemsList";
import Link from "next/link";
import Head from "next/head";
import {useRouter} from "next/router";
import { sendContactForm } from "../lib/send-email";

/**
 * Landing page after user successfully places an order.
 * Shows order details and status
 * @param userOrder
 * @returns {JSX.Element}
 */
export default function orderConfirmation( ) {
    const router = useRouter();
    const { payment_intent_client_secret } = router.query;
    console.log("client secret in page: " + payment_intent_client_secret)

    return (
        <>
            <Head>
                <title>Order Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"/>
            </Head>

        <div className="page confirmation-picture">
            <div className="return-home-button-holder grow">
                <Link href='/' className="return-home-button">Back to Home</Link>
            </div>

            <h1 className="confirmation-detail name">{`Thank you for your order!`}</h1>
            <h1 className="confirmation-detail name">{`We are excited to serve you soon`}</h1>
            <p className="order-directions">When your order is ready, our staff will call it out at the pickup area.</p>
            {/*<div className="confirmation-holder">
            {"Your Order:"}
                <UserOrderItemsList
                orderItems={userOrder.items}
                />
                <h5 className="confirmation-detail date">{`Date & Time Placed: ${userOrder.localeDate}`}</h5>
                <h5 className="confirmation-detail price">{`Order Total: ${userOrder.TotalCost}`}</h5>
                <h5 className="confirmation-detail status">{`Order Status: ${userOrder.status}`} </h5>
                </div>*/}
        </div>
        </>
    )
}


/*export async function getServerSideProps(context) {
    console.log("ORDER CONFIRMATION PROPS!")
    const clientSecret = context.query.payment_intent_client_secret;
    console.log(clientSecret);
    //Get user order from MongoDB based on query params
    const userOrder = await loadUserOrder(clientSecret)
    //await sendContactForm(clientSecret.firstName,clientSecret.TotalCost);
    console.log(userOrder);
    return { props: { userOrder } }
}*/