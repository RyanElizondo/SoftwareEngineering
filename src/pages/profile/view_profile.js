import { loadUser } from "../../lib/load-user";

export default function viewProfile({ user }) {
    const { email, name, pastOrders, points } = user;
    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <label>Email:</label> {email}
            </div>
            <div>
                <label>Name:</label>
                {name}
            </div>
            <div>
                <label> Points: {points}</label>
            </div>
            <h2>Past Orders</h2>
            {pastOrders.map((order, index) => (
                <div key={index}>
                    <div>_</div>
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
