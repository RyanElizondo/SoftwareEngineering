import { loadOrders } from "../../../lib/load-orders"
import { useSelector, useDispatch } from "react-redux"
import {
    selectReceivedOrders,
    selectPreparingOrders,
    selectReadyOrders,
    addOrder,
    setOrders,
    editOrderStatus
} from "../../../features/foodprepOrders/foodprepOrdersSlice";
import { wrapper } from "@/store";
import FoodprepOrder from "../../../components/FoodprepOrder";
//import * as Ably from 'ably/promises'
//import { configureAbly } from '@ably-labs/react-hooks'

import Head from "next/head";
import {useEffect, useState} from "react";
import { Yanone_Kaffeesatz } from 'next/font/google'
import { useSession } from 'next-auth/react';

const yanone = Yanone_Kaffeesatz({ subsets: ['latin'], weight: '700'});

export default function orders({orders}) {
    console.log("ORDERS:");
    console.log(orders);
    const dispatch = useDispatch();
    const receivedOrders = useSelector(selectReceivedOrders);
    const preparedOrders = useSelector(selectPreparingOrders);
    const readyOrders = useSelector(selectReadyOrders);
    const [channel, setChannel] = useState(null);
    const {data, status} = useSession();

    //Connect foodprep orders to websocket for client-server communication on orders.
    /*useEffect(() => {
        console.log("foodprep connecting to Ably");
        const ably = configureAbly({ authUrl: 'https://expressocafeweb.netlify.app/.netlify/functions/ably-token-request })

        ably.connection.on((stateChange) => {
            //console.log(stateChange)
        })

        //console.log("setting channel to foodprep-orders");
        const _channel = ably.channels.get('foodprep-orders')
        //console.log(_channel);
        _channel.subscribe((message) => {
            console.log("received message on foodprep: ");
            console.log(message);
            if(message.data.action === "addOrder") {
                console.log("foodprep received addOrder message")
                dispatch(addOrder(message.data.order));
            } else if(message.data.action === "updateOrder") {
                console.log("foodprep received addOrder message")
                dispatch(editOrderStatus(message.data.order));
            }
        })
        setChannel(_channel)

        return () => {
            _channel.unsubscribe()
        }
    }, [])*/

    if (data?.user.role === "customer") {
        return (
            <div>
                <p>Access Denied</p>
            </div>
        )
    }

    if (status !== "authenticated") {
        return (
            <div>
                <p>Access Denied</p>
            </div>
        )
    }
console.log("RECEVIED ORDERS");
    console.log(receivedOrders);
    return (
        <>
            <Head>
                <title className={yanone.className}>Order Queue</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            
            </Head>
            <div className="foodprep-page">
                <h1 className="foodprep-title">Food Preparation List</h1>
                <div className="column-holder">
                    <div className="foodprep column">
                        <h2 className="orders-title">Received Orders</h2>
                        <FoodprepOrder orderList={receivedOrders} /*channel={channel}*//>
                    </div>
                    <div className="foodprep column">
                        <h2 className="orders-title">In Progress Orders</h2>
                        <FoodprepOrder orderList={preparedOrders} /*channel={channel}*//>
                    </div>
                    <div className="foodprep column">
                        <h2 className="orders-title">Completed Orders</h2>
                        <FoodprepOrder orderList={readyOrders} /*channel={channel}*//>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps( store => async () => {
    //Get menu from /lib/load-orders
    const orders = await loadOrders()
    //const orders = ordersObject.orders;
    store.dispatch(setOrders(orders))
    return {
        props: { orders }
      }
    }
)