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

    return (
        <div>
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
                </div>
            ))}
        </div>
            </>
    );
}


export default FoodPrep
