import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../src/components/layout'
export default function Home() {
  return (
    <>
      <Head>
        <title>REALM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Living Truthfully</h1>

          <p>
            You can find more articles on the{' '}
            <Link href='/blog'>
            <a>blog articles page</a>
            </Link>
          </p>
        </main>
      </Layout>

    </>
  )
}
