import {getSession, signIn, useSession} from "next-auth/react";
import { useSelector } from 'react-redux'
import { selectOrderSubtotal } from '../features/order/orderSlice'
import {useEffect, useState} from "react";
import { loadUser } from "@/lib/load-user";
import { useRouter } from "next/router";
import Link from "next/link";

export default function({user}) {
    const router = useRouter();

    console.log(user);
    const { data: session, sessionStatus } = useSession();
    const clientTotal = useSelector(selectOrderSubtotal);
    console.log("client total");
    console.log(clientTotal);
    const earnPoints = parseFloat(clientTotal) * 10;
    console.log(earnPoints);
    console.log(typeof earnPoints);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")

    const renderGuestView = () => {
        return (
            <div className="confirm-order-holder" id="guest">
                <label>
                    <p>Please enter your first name</p>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </label>
                <label>
                    <p>Enter your email if you would like to receive order status updates (optional)</p>
                    <input
                        type="text"
                        value={email}
                        placeholder="Optional Email"
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                </label>
                <p className="confirm-order-title">{`You can earn ${earnPoints} points if you register an account, which can be used to redeem rewards.`}</p>
                <button onClick={()=> signIn('google')} className="google-signin">Sign in with Google</button>
                {name === '' ? (
                    <p className="enter-name-warning">Please enter your first name above</p>
                ) : (
                    <Link href="/checkout" className="return-button grow">
                        No thanks, place order now
                    </Link>
                )}
            </div>
        )
    }

    useEffect( () => {
        if(earnPoints === 0) {
            console.log("CALLING ROUTER");
            router.push('/')
        }
    }, [] )

    if(sessionStatus === 'loading') {
        return (
            <h3 className="loading">Loading...</h3>
        )
    }
     if(!session) {
        return renderGuestView();
    } else {
        return (
            <div className="confirm-order-holder">
                <p className="confirm-order-title">{`You will earn ${earnPoints} points for this order.`}</p>
                <p className="confirm-order-subtitle">{`You currently have ${user !== null && (user.points !== undefined && user.points !== null) ? `${user.points}` : "0"} points`}</p>
                <Link href="/checkout" className="return-button grow">Place order</Link>
            </div>

        )
    }

}

export async function getServerSideProps(context) {
    console.log("confirm-order server side props")
    const session = await getSession(context);
    if(!session) {
        return { props: {} };
    }
    //Get user from /lib/load-user

    /*await openMongoConnection();
    const userUnformatted = await readUser(session.user.userID);
    const user = JSON.parse(JSON.stringify(userUnformatted));*/

    const user = await loadUser(session.user.userID);

    return { props: { user }  };
}