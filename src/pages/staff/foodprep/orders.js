import { loadOrders } from "../../lib/load-orders"
import { useState } from "react";
import Head from "next/head";

export default function FoodPrep({orders}) {
    const [orderList, setOrderList] = useState(orders);

    const onRemoveOrder = (orderID) => {
        const updatedOrder = orders.filter(order => order.orderID !== orderID);
        setOrderList(updatedOrder);
    }

    return (
        <>
            <Head>
                <title>Order Queue</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"/>
            </Head>
        <div className= "foodpreplist">
            <h1>Food Preparation List</h1>
            {orderList.map(order => (
                <div key={order.orderID}>
                    <h2>Order #{order.orderID}</h2>
                    <p>Status: {order.status}</p>
                    <p>First Name:{order.firstName}</p>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.itemName}>
                                {item.itemQuantity} x {item.itemName}
                                {item.customization && item.customization.length > 0 && (
                                    <ul>
                                        {item.customization.map(c => (
                                            <li key={c}>{c}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => onRemoveOrder(order.orderID)}>Food is ready</button>
                </div>
            ))}
        </div>
            </>
    );
}

export async function getServerSideProps() {
    //Get menu from /lib/load-orders
    const ordersObject = await loadOrders()
    const orders = ordersObject.orders;
    return { props: { orders } }
}