import {loadUserOrder} from "@/lib/load-user-order";
import UserOrderItemsList from "@/components/UserOrderItemsList";
import Link from "next/link";

/**
 * Landing page after user successfully places an order.
 * Shows order details and status
 * @param userOrder
 * @returns {JSX.Element}
 */
export default function orderConfirmation( {userOrder} ) {

    return (
        <div className="page">
            <div className="return-home-button-holder">
                <Link href='/' className="return-home-button grow">Expresso Cafe</Link>
            </div>
            <h1 className="confirmation-detail name">{`Thank you for your order, ${userOrder.firstName}!`}</h1>
            <div className="confirmation-holder">
                <h3 className="confirmation-detail orderID">{`Order number: ${userOrder.orderID}`}</h3>
                <h5 className="confirmation-detail date">{`Date placed: ${userOrder.localeDate}`}</h5>
                <h5 className="confirmation-detail status">{`Order status: ${userOrder.status}`}</h5>
                <UserOrderItemsList
                    orderItems={userOrder.items}
                />
            </div>
        </div>
    )
}


export async function getServerSideProps() {
    //Get menu from /lib/load-user-order
    const userOrder = await loadUserOrder()
    return { props: { userOrder } }
}