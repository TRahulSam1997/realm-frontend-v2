import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import client from '../../lib/apollo/client'
import POSTS_WITH_SLUGS from '../../lib/queries/blog/postswithslugs'
import POST from '../../lib/queries/blog/post'
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';
import styled from 'styled-components';
import Layout from '../../src/components/layout/index'

const Styles = styled.div`

    .blogPostBodyText {
        .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black;
        }

        .tooltip .tooltiptext {
            visibility: hidden;
            width: 120px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -60px;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
        }

        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }

        width: 100%;
        display: block;
        font-size: 21px;
        text-align: left;
        text-justify: inter-word;
        padding-top: 0.6em;
        padding-bottom: 0.2em;
        /* font-family: libre baskerville, serif; */
        color: black;

        blockquote {
            font-family: libre baskerville,serif;
            font-style: italic;
            width: inherit;
            margin: 0.25em 0;
            padding-left: 15px;
            /* padding: 0px 0px; */
            line-height: 1.45;
            position: relative;
            color: #747474;
            border-left:5px solid #384d48;
        }

        .wp-block-separator {
            padding-top: 1em;
            padding-bottom: 1em;
        }

        h3 {
            padding-top: 2em;
            padding-bottom: 2em;
            text-align: left;
            font-weight: bold;
            border: solid #dc3545 0.25em;
        }

        .wp-block-image {
            display: table;
            margin: 0 auto;
        }

        ol {
            list-style-type: numbers;
        }

        p {
            margin-top: 1em;
            margin-bottom: 1em;
        }
    }



`;

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
        <Styles>
            <Layout>
                <div className={styles.container}>
                    <Head>
                        <title>{postData.title}</title>
                        <link rel='icon' href='/favicon.ico' />
                    </Head>

                    <main className={styles.main}>
                        {router.isFallback ? (
                            <h2>Loading...</h2>
                        ) : (
                            <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                                <div className={blogStyles.postmeta}>
                                    <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                                        {postData.title}
                                    </h1>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
                                        <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
                                            {formatDate(postData.date)}
                                        </p>
                                    </div>
                                    <img src={postData.featuredImage.node.sourceUrl} />
                                </div>
                                <div
                                    className="blogPostBodyText"
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
            </Layout>
        </Styles>
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