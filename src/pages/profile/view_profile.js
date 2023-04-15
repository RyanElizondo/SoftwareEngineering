import { loadUser } from "../../lib/load-user";

export default function viewProfile({ user }) {
    const { email, name, pastOrders, points } = user;
    return (
        <div className = "user-profile-page">
            <h1 className= "user-profile">User Profile</h1>
            <div className = "user-info">
                <label>Email:</label> {email}

                <label>Name:</label> {name}

                <label> Points: {points}</label>
            </div>
            <h2 className= "past-orders">Past Orders</h2>
            {pastOrders.map((order, index) => (
                <div key={index} className= "order-pasts">
                    <div></div>
                    <div>Order ID: {order.orderID}</div>
                    <div>Order Date: {order.localeDate}</div>
                    <div>Order Total: {order.TotalCost}</div>
                    <div>Total Items: {order.items.reduce((total, item) => total + item.itemQuantity, 0)}</div>
                    <div>
                        Items:
                        {order.items.map((item, index) => (
                            <div key={index}>
                                <div>Item Name: {item.itemName}</div>
                                <div>Item Quantity: {item.itemQuantity}</div>
                                <div>Customization: {item.customization}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {pastOrders.length === 0 && <div>No past orders found.</div>}
        </div>
    );
}

export async function getServerSideProps() {
    //Get user from /lib/load-user
    const user = await loadUser();
    return { props: { user } };
}
