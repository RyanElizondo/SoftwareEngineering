import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Expresso Cafe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='bg-image'>

          <div className="page">
            <h1 className="welcome">Welcome to Expresso Cafe</h1>
            <Link href="/begin">Begin order</Link>
          </div>

        </div>
      </main>
    </>
  )
}
