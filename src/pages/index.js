import Head from 'next/head'
import Link from 'next/link'
import withNavBar from "@/components/withNavBar";
import { Yanone_Kaffeesatz } from 'next/font/google'

const yanone = Yanone_Kaffeesatz({ subsets: ['latin'], weight: '700'});

function Home() {
  return (
    <>
      <Head>

        <title className={yanone.className}>Expresso Café</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
          
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

export default withNavBar(Home);