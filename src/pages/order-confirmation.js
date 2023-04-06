import {loadUserOrder} from "@/lib/load-user-order";
import UserOrderItemsList from "@/components/UserOrderItemsList";

/**
 * Landing page after user successfully places an order.
 * Shows order details and status
 * @param userOrder
 * @returns {JSX.Element}
 */
export default function orderConfirmation( {userOrder} ) {

    return (
        <div className="page">
            <div className="confirmation-holder">
                <h3 className="confirmation-detail orderID">{`Order number: ${userOrder.orderID}`}</h3>
                <h5 className="confirmation-detail name">{`Order placed by: ${userOrder.firstName}`}</h5>
                <h5 className="confirmation-detail date">{`Date placed: ${userOrder.localeDate}`}</h5>
                <h5 className="confirmation-detail status">{`Order status: ${userOrder.status}`}</h5>
                {UserOrderItemsList(userOrder.items)}
            </div>
        </div>
    )
}


export async function getServerSideProps() {
    //Get menu from /lib/load-user-order
    const userOrder = await loadUserOrder()
    return { props: { userOrder } }
}