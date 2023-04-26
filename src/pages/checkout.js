import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux'
import { selectItems } from '../features/order/orderSlice'

import CheckoutForm from "../components/CheckoutForm.jsx";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const clientItems = JSON.parse(JSON.stringify(useSelector(selectItems)));

  const reqInfo = {
    "stripeClientSecret": clientSecret,
    "status": "Received",
    "paymentStatus": "incomplete",
    "localeDate": new Date().toLocaleDateString(),
      "localeTime": new Date().toLocaleTimeString(),
    "items": clientItems
  }

  const buildOrder = (orderItems) => {

      const newItems = orderItems.map( item => {
          return {...item, customizations: Object.entries(item.customizations)}
      })
      console.log("new order items for foodprep: ");
      console.log(newItems);
      return newItems

  }

  React.useEffect(() => {
    console.log("calling create payment intent");
    // Create PaymentIntent as soon as the page loads
    fetch("https://expressocafeweb.netlify.app/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: buildOrder(clientItems) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
          reqInfo.stripeClientSecret = data.clientSecret;
        /* TODO call server endpoint to add client secret and orderItems to server database */
          console.log("making HTTP request to send client order")
        return fetch('https://expressocafeweb.netlify.app/.netlify/functions/managerOrders',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(reqInfo)
            }
            )
      })
        .then((response) => {
          console.log(response);
        })
        .catch( (error) => {
          console.log(error);
        }) ;

  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}