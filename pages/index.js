import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../src/components/layout'
import client from '../lib/apollo/client'
import POSTS_FOR_HOME from '../lib/queries/home/postsForHome'
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
          <h1 className="md:text-7xl p-20 italic font-bold text-gray-900 dark:text-gray-100">
            Living Truthfully
          </h1>
          <div className="w-5/6 h-72">
            <EmailCollection />
          </div>
          <h1 className="md:text-xl mt-20 mb-2 text-transform: uppercase text-gray-600 dark:text-gray-100">
            Recent Essays
          </h1>
          <section className="w-4/6 mb-20">
                <hr></hr>
                {edges.map(({ node }) => (
                  <main className="mt-10" key={node.id}>
                    <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10" key={node.id}>
                      <div className="w-3/3" key={node.id}>
                        <Link href={`/blog/${node.slug}`}>
                          <a className="block rounded w-full lg:flex mb-10">
                            <div
                              className="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-85"
                              style={{backgroundImage: `url(${node.extraPostInfo.thumbImage})`}}
                              title={node.title}
                            >
                            </div>
                            <div className="bg-white rounded px-4 flex flex-col justify-between leading-normal">
                              <div
                                className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2"
                              >
                                {node.title}
                              </div>
                              <p
                                className="text-gray-700 text-base"
                              >
                                {node.extraPostInfo.authorExcerpt}
                              </p>
                              <div className="flex mt-3">
                                <img src="https://res.cloudinary.com/dkd4xa60a/image/upload/v1622025941/REALM/istockphoto-1016744034-612x612_ajt0jr.jpg"
                                  className="h-10 w-10 rounded-full mr-2 object-cover" />
                                <div>
                                  <p className="font-semibold text-gray-700 text-sm capitalize"> {node.author.node.name} </p>
                                  <p className="text-gray-600 text-xs">{(node.date).split('T')[0]} </p>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </main>
                ))}
            <p className="text-center mb-2">
              <Link href='/blog/'>
                <a className="md:text-xl text-transform: uppercase text-gray-600 hover:text-gray-900 dark:text-gray-100">
                  <span>Read More</span>
                </a>
              </Link>
            </p>
            <hr></hr>
          </section>
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