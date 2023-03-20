import { loadOrders } from '../pages/lib/load-orders'
import {useState} from "react";

export default function Orders({orders}) {
    const [orders, setOrders] = useState(data.orders);
    const handleCompleteOrder = (orderID) => {
        const updatedOrders = orders.map((order) => {
            if (order.id === orderId) {
                return {
                    ...order,
                    statues: 'completed',
                }
            }
            return order;
        });
        setOrders(updatedOrders);
    }

    const createOrderComponent = (order, index) => {

        return (

            <div className="order" key={index}>
                <h2>{`orderID: ${order.orderID}`}</h2>
                <h2>{`First name: ${order.firstName}`}</h2>
                <h2>{`Date placed: ${order.localeDate}`}</h2>
                <h2>{`Status: ${order.status}`}</h2>
                <h2>{`Items: ${order.items}`}</h2>
                {order.status === 'pending' && (
                <button onClick = {() => handleCompleteOrder(orderID)}>
                    Ready
                </button>)}
            </div>
        )
    }

    return (
        <div className="orders">
            <h1> Food Preparation List</h1>
            {orders.map( (order, index) => (createOrderComponent(order, index)))}
        </div>
    )

}

export async function getServerSideProps() {
    //Get order from /lib/load-orders
    const orders = await loadOrders()
    return { props: { orders } }
}