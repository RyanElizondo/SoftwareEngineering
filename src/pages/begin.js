import Link from 'next/link';

export default function Begin(){
    return (
        <div className="page">
            <div className="login-links-holder">
                <link rel="stylesheet"
                      href = "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap"/>
                {/*TODO replace below href to redirect user to Oauth2.0 API */}
                <h2 className="logo">
                    <img src = "google.png" alt="LogoHere" /></h2>
                <Link href="/menu" className="login-link1">Continue with Google</Link>
                <br></br>
                <Link href="/menu" className="login-link2">Continue as Guest</Link>
            </div>
        </div>
    )
}