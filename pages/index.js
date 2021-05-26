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
                    <main className="mt-10">
                      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
                        <div className="w-full lg:w-2/3" key={node.id}>
                          <a className="block rounded w-full lg:flex mb-10">
                            <div
                                className="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-75"
                                style={{backgroundImage: `url(${node.extraPostInfo.thumbImage})`}}
                              >
                                {/* <div className={blogStyles.listitem__thumbnail}>
                                    <figure>
                                        <img
                                        src={node.extraPostInfo.thumbImage}
                                        alt={node.title}
                                        />
                                    </figure>
                                </div> */}
                                <div className={blogStyles.listitem__content}>
                                    <h2>{node.title}</h2>
                                    <p>{node.extraPostInfo.authorExcerpt}</p>
                                    <Link href={`/blog/${node.slug}`}>
                                        <a>Read more</a>
                                    </Link>
                                </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </main>
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