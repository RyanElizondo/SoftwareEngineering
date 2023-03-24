import { loadOrders } from "../../lib/load-orders"
import { useSelector, useDispatch } from "react-redux"
import { selectReceivedOrders, selectPreparingOrders, selectReadyOrders } from "@/features/foodprepOrders/foodprepOrdersSlice";
import { wrapper } from "@/store";
import { setOrders } from "../../../features/foodprepOrders/foodprepOrdersSlice"
import FoodprepOrder from "@/components/FoodprepOrder";

import Head from "next/head";

export default function orders({orders}) {

    const dispatch = useDispatch();

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
            <div className="foodprep-page">
                <h1 className="foodprep-title">Food Preparation List</h1>
                <div className="column-holder">
                    <div className="foodprep column">
                        <h2 className="orders-title">Received Orders</h2>
                        <FoodprepOrder orderList={receivedOrders}/>
                    </div>
                    <div className="foodprep column">
                        <h2 className="orders-title">In Progress Orders</h2>
                        <FoodprepOrder orderList={preparedOrders}/>
                    </div>
                    <div className="foodprep column">
                        <h2 className="orders-title">Completed Orders</h2>
                        <FoodprepOrder orderList={readyOrders}/>
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