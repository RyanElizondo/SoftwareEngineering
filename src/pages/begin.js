import Link from 'next/link';

export default function Begin(){
    return (
        <div className="page">
            <div className="login-links-holder">
                {/*TODO replace below href to redirect user to Oauth2.0 API */}
                <Link href="/menu" className="login-link">Continue with Google</Link>
                <Link href="/menu" className="login-link">Continue as Guest</Link>
            </div>
        </div>
    )
}