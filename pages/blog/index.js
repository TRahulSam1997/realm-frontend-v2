import Head from 'next/head';
import Link from 'next/link';
import React from 'react'
import client from '../../lib/apollo/client'
import ALL_POSTS from '../../lib/queries/allposts'
// import { getAllPosts } from '../../lib/api';

import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

const Blog = ({ allPosts: { edges } }) => (
    <div className={styles.container}>
        <Head>
            <title>Blog articles page</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>Latest blog articles</h1>
            <hr />
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
        </main>
    </div>
);

export default Blog;

export async function getStaticProps() {
    // const allPosts = await getAllPosts();

    const { data, loading, networkStatus } = await client.query({
        query: ALL_POSTS
    });

    return {
      props: {
        allPosts: data?.posts
      }
    };
  }