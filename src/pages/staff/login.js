import Head from "next/head";
import { useSession, signIn } from 'next-auth/react'
import Link from "next/link";

const Login = () => {
    const { data, status } = useSession()
    

    // If user is signed in, either sign out or continue to menu.
    if (status === 'authenticated') {
        return (
            <div className= "welcome-page">
                <pc className = "welcome-user">Welcome, {data.user.name}</pc>
                <button className= "sign-out" onClick={()=> signOut()}>Sign out</button>
                <Link href="/menu" className="login-link2">Continue to Menu</Link>
            </div>
        );

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
                    <button onClick={()=> signIn('credentials')} >Continue to Login</button>
                </div>
            </div>
    
    
        </>
        );
    }
};

export default Login;
