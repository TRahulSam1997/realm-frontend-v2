import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import client from '../../lib/apollo/client'
import POSTS_WITH_SLUGS from '../../lib/queries/allposts'
import POST from '../../lib/queries/post'
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';

export default function Post({ postData }) {
    const router = useRouter();

    if (!router.isFallback && !postData?.slug) {
        return <p>hmm... looks like an error</p>
    }

    const formatDate = date => {
        const newDate = new Date(date);

        return `${newDate.getDate()}/${
            newDate.getMonth() + 1
        }/${newDate.getFullYear()}`
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>{postData.title}</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                    <article className={blogStyles.article}>
                        <div className={blogStyles.postmeta}>
                            <h1 className={styles.title}>{postData.title}</h1>
                            <p>{formatDate(postData.date)}</p>
                            <img src={postData.featuredImage.node.sourceUrl} />
                        </div>
                        <div
                            className='post-content content'
                            dangerouslySetInnerHTML={{ __html: postData.content }}
                        />
                    </article>
                )}
                <p>
                    <Link href={`/blog`}>
                        <a>Back</a>
                    </Link>
                </p>
            </main>
        </div>
    )
}

export async function getStaticPaths() {
    // const allPosts = await getAllPostsWithSlug();

    const { data } = await client.query({
        query: POSTS_WITH_SLUGS
    });

    if (
        data?.posts &&
        data?.posts.edges !== null &&
        data?.posts.edges.node !== null &&
        data?.posts.edges.length > 0
    ) {
        return {
            paths: data?.posts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
            fallback: 'blocking'
        }
    }

}


export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: POST,
            variables: {
                id: params.slug,
                idType: 'SLUG'
            }
        });

    return {
      props: {
        postData: data.post
      },
      revalidate: 1
    };
  }