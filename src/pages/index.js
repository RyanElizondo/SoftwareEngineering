import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>

        <title>Expresso Café</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@700&display=swap"/>
      </Head>
      <main>
        <div className='bg-image'>
          <div className="page">
            <h1 className="welcome">Expresso Café</h1>
            <Link href="/begin" className="button">Begin order</Link>
          </div>
            <h2 className="quote">Good coffee is a pleasure, good friends are a treasure, and a cozy café is both.</h2>
        </div>
      </main>
    </>
  )
}



