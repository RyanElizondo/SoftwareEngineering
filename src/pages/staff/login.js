import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react'
import { Yanone_Kaffeesatz } from 'next/font/google'

const yanone = Yanone_Kaffeesatz({ subsets: ['latin'], weight: '700'});

const Login = () => {
    const { data, status } = useSession()

    // If user is signed in, either sign out or continue to menu.
    if (status === 'authenticated' && data.user.role !== 'customer') {
        if (data.user.name === 'Manager') {
            return (
            <div className= "welcome-page">
                <pc className = "welcome-user">Welcome, {data.user.name}</pc>
                <button className= "sign-out" onClick={()=> signOut()}>Sign out</button>
                <Link href="/staff/foodprep/orders" className="login-link2">View Orders</Link>
                <Link href="/staff/manager/inventory" className="login-link2">View Inventory</Link>
            </div>
            );
        } else {
            return (
                <div className= "welcome-page">
                    <pc className = "welcome-user">Welcome, {data.user.name}</pc>
                    <button className= "sign-out" onClick={()=> signOut()}>Sign out</button>
                    <Link href="/staff/foodprep/orders" className="login-link2">View Orders</Link>
                </div>
            );
        }

    // If user is not signed in, either sign in with google or continue as guest.
    } else {
        return (
            <>
                <Head >

                    <title className={yanone.className}>Staff Login</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />

                </Head>

            <div className="page">
                <div className="login-links-holder">
                    <link rel="stylesheet"
                          href = "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"/>
                    <button onClick={()=> signIn()} className="google-signin">Continue to Staff Login</button>
                </div>
            </div>


        </>
        );
    }
};

export default Login;
