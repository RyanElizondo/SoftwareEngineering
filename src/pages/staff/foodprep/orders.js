import { loadOrders } from "../../../lib/load-orders"
import { useSelector, useDispatch } from "react-redux"
import {
    selectReceivedOrders,
    selectPreparingOrders,
    selectReadyOrders,
    addOrder,
    setOrders,
    editOrderStatus
} from "@/features/foodprepOrders/foodprepOrdersSlice";
import { wrapper } from "@/store";
import FoodprepOrder from "@/components/FoodprepOrder";
import * as Ably from 'ably/promises'
import { configureAbly } from '@ably-labs/react-hooks'

import Head from "next/head";
import {useEffect, useState} from "react";

export default function orders({orders}) {

    const dispatch = useDispatch();

    const [channel, setChannel] = useState(null);

    const receivedOrders = useSelector(selectReceivedOrders);
    const preparedOrders = useSelector(selectPreparingOrders);
    const readyOrders = useSelector(selectReadyOrders);

    //Connect foodprep orders to websocket for client-server communication on orders.
    useEffect(() => {
        const ably = configureAbly({ key: process.env.ABLY_API_KEY}/*{ authUrl: '/api/authentication/token-auth' }*/)

        ably.connection.on((stateChange) => {
            console.log(stateChange)
        })

        const _channel = ably.channels.get('foodprep-orders')
        _channel.subscribe((message) => {
            if(message.data.action === "addOrder") {
                dispatch(addOrder(message.data.order));
            } else if(message.data.action === "updateOrder") {
                dispatch(editOrderStatus(message.data.order));
            }
        })
        setChannel(_channel)

        return () => {
            _channel.unsubscribe()
        }
    }, [])

    return (
        <>
            <Head>
                <title>Order Queue</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"/>
            </Head>
            <div className="foodprep-page">
                <h1 className="foodprep-title">Food Preparation List</h1>
                <div className="column-holder">
                    <div className="foodprep column">
                        <h2 className="orders-title">Received Orders</h2>
                        <FoodprepOrder orderList={receivedOrders} channel={channel}/>
                    </div>
                    <div className="foodprep column">
                        <h2 className="orders-title">In Progress Orders</h2>
                        <FoodprepOrder orderList={preparedOrders} channel={channel}/>
                    </div>
                    <div className="foodprep column">
                        <h2 className="orders-title">Completed Orders</h2>
                        <FoodprepOrder orderList={readyOrders} channel={channel}/>
                    </div>
                </div>
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