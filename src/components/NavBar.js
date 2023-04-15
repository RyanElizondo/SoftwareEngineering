import Link from 'next/link';

/**
 * Navigation component that provides buttons for going to the homepage, viewing profile, menu, etc
 * @returns {JSX.Element}
 * @constructor
 */
export default function NavBar() {
    return (
        <div className="navbar">
            <h2 className="nav-button">
                <Link href="/">Home</Link>
            </h2>
            <h2 className="nav-button">
                <Link href="menu">Menu</Link>
            </h2>
            <h2 className="nav-button">
                <Link href="about-us">About us</Link>
            </h2>
            <h2 className="nav-button">
                <Link href="contact">Contact</Link>
            </h2>
            <h2 className="nav-button">
                <Link href="profile">Profile</Link>
            </h2>
        </div>
    )
}