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
        <div className="navbar" >
            <img src="favicon.ico" alt="Logo" width="100" height="100" />
            <h2 className="nav-button1">
                <Link href="/" style={{ textDecoration: 'none' }}>Home</Link>
            </h2>
            <h2 className="nav-button2">
                <Link href="menu" style={{ textDecoration: 'none' }}>Menu</Link>
            </h2>
            <h2 className="nav-button3">
                <Link href="about-us" style={{ textDecoration: 'none' }}>About us</Link>
            </h2>
            <h2 className="nav-button4">
                <Link href="contact" style={{ textDecoration: 'none' }}>Contact</Link>
            </h2>
            <h2 className="nav-button5">
                <Link href="profile" style={{ textDecoration: 'none' }}>{session ? "Profile" : "Create Account"}</Link>
            </h2>

        </div>
    )
}

