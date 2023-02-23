import Link from 'next/link';

export default function Begin(props){
    return (
        <div>
            <Link href="/menu">Continue with Google</Link>
            <Link href="/menu">Continue as Guest</Link>
        </div>
    )
}