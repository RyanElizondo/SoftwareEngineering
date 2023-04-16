import { loadUser } from "../lib/load-user";
import withNavBar from "@/components/withNavBar";
import { useSession } from "next-auth/react";

function Profile({ user }) {

    const { data: session, sessionStatus } = useSession();

    //const { email, name, pastOrders, points } = user;

    const generateProfilePage = (user) => {
        const {name, email} = session.user;
        console.log(session);

        return (
            <div className = "user-profile-page">
                <h1 className= "user-profile">User Profile</h1>
                <div className = "user-info">
                    <label>Email:</label> {email}

                    <label>Name:</label> {name}

                    <label> Points:{/*TODO ADD points*/} </label>
                </div>
                {<h2 className="past-orders">Past Orders</h2>}
                {/*TODO fetch past orders. pastOrders.map((order, index) => (
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
                {pastOrders.length === 0 && <div>No past orders found.</div>}*/}
            </div>
        );
    }

    if(sessionStatus === 'loading') {
        return (
            <h3 className="loading">Loading...</h3>
        )
    }

    if(session) {
        return generateProfilePage(user);
    } else {
        return <h3 className="sign-in">Sign in or create account</h3>
    }

}

export async function getServerSideProps() {
    //Get user from /lib/load-user
    const user = await loadUser();
    return { props: { user } };
}

export default withNavBar(Profile);
