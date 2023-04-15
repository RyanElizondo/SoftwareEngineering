import { useDispatch } from "react-redux"
import { editOrderStatus, removeOrder } from "@/features/foodprepOrders/foodprepOrdersSlice";

const getButtonName = (status) => {
    switch(status) {
        case "Received": return "Set to preparing";
        case "Preparing": return "Set to ready";
        case "Ready": return "Hide order";
        default: return "Now preparing";
    }
}

export default function FoodprepOrder({orderList}) {

    const dispatch = useDispatch();

    const onUpdateStatus = (event, order) => {
        let newStatus = "Received";
        if(order.status === "Ready") {
            //remove order from screen
            dispatch(removeOrder({orderID: order.orderID}));
            return;
        } else if(order.status === "Received") {
            newStatus = "Preparing";
            dispatch(editOrderStatus({orderID: order.orderID, newStatus: newStatus}));
        } else if(order.status === "Preparing") {
            newStatus = "Ready";
            dispatch(editOrderStatus({orderID: order.orderID, newStatus: newStatus}))
        }
    }

    return(
        <div className="food-prep-orders-holder">
            {orderList.map(order => (
                    <div className= "foodprep-order-holder" key={order.orderID}>
                        <h2 className="foodprep-order-title">Order #{order.orderID}</h2>
                        <p className="foodprep-order-status">Status: {order.status}</p>
                        <h3 className="foodprep-order-date">Date Received: {order.localeDate}</h3>
                        <p className="foodprep-order-name">First Name: {order.firstName}</p>
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
                        <button onClick={ (e) => onUpdateStatus(e,order) } className="foodprep-button">{getButtonName(order.status)}</button>
                    </div>
                ))}
        </div>
    )
}