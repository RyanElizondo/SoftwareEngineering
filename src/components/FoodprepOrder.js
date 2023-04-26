import { useDispatch } from "react-redux"
import { editOrderStatus, removeOrder } from "../features/foodprepOrders/foodprepOrdersSlice";

const getButtonName = (status) => {
    switch(status) {
        case "Received": return "Set to preparing";
        case "Preparing": return "Set to ready";
        case "Ready": return "Hide order";
        default: return "Now preparing";
    }
}

export default function FoodprepOrder({orderList, channel}) {

    const dispatch = useDispatch();

    //publish message to channel to notify server of status update
    const onUpdateStatus = (event, order) => {
        let newStatus = "Received";
        if(order.status === "Ready") {
            //remove order from screen
            dispatch(removeOrder({_id: order._id}));
            return;
        } else if(order.status === "Received") {
            newStatus = "Preparing";
            dispatch(editOrderStatus({_id: order._id, newStatus: newStatus}));
        } else if(order.status === "Preparing") {
            newStatus = "Ready";
            dispatch(editOrderStatus({_id: order._id, newStatus: newStatus}))
        }

        //send order ID and new status to server
        /*if(newStatus !== "Received") {
            fetch("",
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "_id": order._id,
                        "status": newStatus
                    })
                })
                .catch( (error) => {
                    console.log("Error calling server API to update order status", error);
                })
        }*/

        const channelData = {
            _id: order._id,
            action: "updateStatus",
            status: newStatus
        }
        console.log("sending new status to server")
        if(newStatus !== "Received") {
            channel.publish("foodprep-orders", channelData,
                (error) => {console.log("Channel publish failed with error: ", error)}
            );
        }

    }

    return(
        <div className="food-prep-orders-holder">
            {orderList.map((order, index) => (
                    <div className= "foodprep-order-holder" key={order._id + "0" + index}>
                        <h2 className="foodprep-order-title" key={order._id + "1" + index}>{`Order ${order._id.slice(-4)}`}</h2>
                        <p className="foodprep-order-status" key={order._id + "2" + index}>Status: {order.status}</p>
                        <h3 className="foodprep-order-date" key={order._id + "3" + index}>Date Received: {order.localeDate}</h3>
                        <h3 className="foodprep-order-date" key={order._id + "3" + index}>Time Received: {order.localeTime}</h3>
                        {/*<p className="foodprep-order-name" key={order._id + "4" + index}>First
                            Name: {order.firstName}</p>*/}
                        <ul className="foodprep-order-items-holder" key={order._id + "5"}>
                            {order.items.map((item, i) => (
                                <li className="foodprep-order-item" key={item.name + i + index + order._id}>
                                    {item.quantity} x {item.name}
                                    {item.customizations && item.customizations.length > 0 && (
                                        <ul className="foodprep-order-item-customization-holder" key={order._id + "6"  + i + index}>
                                            {item.customizations.map(c => (
                                                <li key={c + i + index + item.name}>{c}</li>
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