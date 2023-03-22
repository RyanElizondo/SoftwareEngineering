import Orderdata from '../../../../json/orderdata.json' ;
//import {loadOrders} from "@/pages/lib/load-orders";
import {useState, useEffect} from "react";
import Head from "next/head";



function FoodPrep() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        // Set the initial state of orders to the data loaded from the JSON file
        setOrders(Orderdata.orders);
    }, []);
    const onRemoveOrder = (orderID) => {
        const updatedOrder = orders.filter(order => order.orderID !== orderID);
        setOrders(updatedOrder);
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
            {orders.map(order => (
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


export default FoodPrep
