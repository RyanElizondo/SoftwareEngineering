import Link from 'next/link';
import {useSession} from "next-auth/react";

/**
 * Navigation component that provides buttons for going to the homepage, viewing profile, menu, etc
 * @returns {JSX.Element}
 * @constructor
 */
export default function NavBar() {
    const { data: session, sessionStatus } = useSession();

    return (
        <div className="navbar">
            <h2 className="logo">
                <img src = "google.png" alt="LogoHere" /></h2>
            <h2 className="nav-button1">
                <Link href="/">Home</Link>
            </h2>
            <h2 className="nav-button2">
                <Link href="menu">Menu</Link>
            </h2>
            <h2 className="nav-button3">
                <Link href="about-us">About us</Link>
            </h2>
            <h2 className="nav-button4">
                <Link href="contact">Contact</Link>
            </h2>
            <h2 className="nav-button5">
                <Link href="profile">{session ? "My account" : "Sign in"}</Link>
            </h2>
        </div>
    )
}