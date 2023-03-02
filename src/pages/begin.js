import Link from 'next/link';

export default function Begin(props){
    return (
        <div className="page">
            <div className="login-links-holder">
                <Link href="/menu" className="login-link">Continue with Google</Link>
                <Link href="/menu" className="login-link">Continue as Guest</Link>
            </div>
        </div>
    )
}