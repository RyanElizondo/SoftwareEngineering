import Link from 'next/link';
import Head from 'next/head';
import {useSession, signIn, signOut} from 'next-auth/react';
import { Yanone_Kaffeesatz } from '@next/font/google'

const yanone = Yanone_Kaffeesatz({ subsets: ['latin'], weight: '700'});

const Begin = () => {
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
    
                    <title className={yanone.className}>Expresso Sign-In</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                    
                </Head>
            
            <div className="page">
                <div className="login-links-holder">
                    <link rel="stylesheet"
                          href = "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"/>
                    <h2 className="logo">
                        <img src = "google.png"/></h2>
                    <button onClick={()=> signIn()} className="google-signin">Continue with Google</button>
                    <Link href="/menu" className="login-link2">Continue as Guest</Link>
                </div>
            </div>
    
    
        </>
        );
    }
};

export default Begin