import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../src/components/layout'
import client from '../lib/apollo/client'
import POSTS_FOR_HOME from '../lib/queries/home/postsForHome'
import blogStyles from '../styles/Blog.module.css'
import EmailCollection from '../src/components/email/emailCollection'

export default function Home({ allPostsForHome: { edges } }) {
  return (
    <>
      <Head>
        <title>REALM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>Living Truthfully</h1>
            <EmailCollection />
            <section>
                  {edges.map(({ node }) => (
                      <div className={blogStyles.listitem} key={node.id}>
                          <div className={blogStyles.listitem__thumbnail}>
                              <figure>
                                  <img
                                  src={node.extraPostInfo.thumbImage}
                                  alt={node.title}
                                  />
                              </figure>
                          </div>
                          <div className={blogStyles.listitem__content}>
                              <h2>{node.title}</h2>
                              <p>{node.extraPostInfo.authorExcerpt}</p>
                              <Link href={`/blog/${node.slug}`}>
                                  <a>Read more</a>
                              </Link>
                          </div>
                      </div>
                  ))}
            </section>
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

export async function getStaticProps() {
  // const allPosts = await getAllPosts();

  const { data } = await client.query({
      query: POSTS_FOR_HOME
  });

  return {
    props: {
      allPostsForHome: data?.posts
    },
    revalidate: 1
  };
}