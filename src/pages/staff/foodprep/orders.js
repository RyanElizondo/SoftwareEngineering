import { loadOrders } from "../../lib/load-orders"
import { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectReceivedOrders, selectPreparingOrders, selectReadyOrders,
    addOrder, editOrderStatus, removeOrder } from "@/features/foodprepOrders/foodprepOrdersSlice";
import { wrapper } from "@/store";
import { setOrders } from "../../../features/foodprepOrders/foodprepOrdersSlice"

import Head from "next/head";

export default function orders({orders}) {

    const dispatch = useDispatch();
    /*console.log(orders);
    useEffect( () => {
        orders.forEach( order => {
            console.log("dispatching in foreach loop")
            dispatch(addOrder({order: order}))
        })
    }, [orders] )*/

    const onUpdateStatus = (event) => {
        let newStatus = "received";
        if(order.status === "ready") {
            //remove order from screen
            dispatch(removeOrder({orderID: order.orderID}));
            return;
        } else if(order.status === "received") {
            newStatus = "preparing";
            dispatch(editOrderStatus({orderID: order.orderID, newStatus: newStatus}));
        } else if(order.status === "preparing") {
            newStatus = "ready";
            dispatch(editOrderStatus({orderID: order.orderID, newStatus: newStatus}))
        }
    }

    const receivedOrders = useSelector(selectReceivedOrders);
    const preparedOrders = useSelector(selectPreparingOrders);
    const readyOrders = useSelector(selectReadyOrders);

    return (
        <>
            <Head>
                <title>Order Queue</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"/>
            </Head>
            <div className= "foodprep-page">
                <h1> Food Preparation List</h1>
                {orders.map(order => (
                    <div className= "foodprep-order-holder" key={order.orderID}>
                        <h2 className="foodprep-order-title">Order #{order.orderID}</h2>
                        <p className="foodprep-order-status">Status: {order.status}</p>
                        <h3 className="foodprep-order-date">Date Received: {order.localeDate}</h3>
                        <p className="foodprep-order-name">First Name:{order.firstName}</p>
                        <ul className="foodprep-order-items-holder">
                            {order.items.map(item => (
                                <li className="foodprep-order-item" key={item.itemName}>
                                    {item.itemQuantity} x {item.itemName}
                                    {item.customization && item.customization.length > 0 && (
                                        <ul className="foodprep-order-item-customization-holder">
                                            {item.customization.map(c => (
                                                <li key={c}>{c}</li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <button onClick={onUpdateStatus}>Proceed</button>
                    </div>
                ))}
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps( store => async () => {
    //Get menu from /lib/load-orders
    const ordersObject = await loadOrders()
    const orders = ordersObject.orders;

    store.dispatch(setOrders(orders))
    return {
        props: { orders }
      }
    }
)