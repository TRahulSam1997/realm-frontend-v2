import { useRouter } from 'next/router';
import Link from 'next/link';
import client from '../../lib/apollo/client'
import POSTS_WITH_SLUGS from '../../lib/queries/blog/postswithslugs'
import POST from '../../lib/queries/blog/post'
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';
import styled from 'styled-components';
import Layout from '../../src/components/layout/index'
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import db from '../../src/utils/db';
import SideBar from '../../src/components/sidebar/sidebar';

const Styles = styled.div`

    .blogPostBodyText {
        width: 100%;
        display: block;
        font-size: 19px;
        text-align: left;
        text-justify: inter-word;
        padding-top: 0.6em;
        padding-bottom: 0.2em;
        /* font-family: libre baskerville, serif; */
        color: black;

        .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black;

            .tooltiptext {
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

            .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }
        }

        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }

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

        .iframe-container{
            position: relative;
            width: 100%;
            padding-bottom: 56.25%;
            height: 0;
        }

        .iframe-container iframe{
            position: absolute;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .wp-block-image, figcaption, .wp-block-embed {
            display: table;
            margin: 0 auto;
            width: inherit;
        }

        figcaption {
            font-size: 16px;
            font-style: italic;
        }

        ol {
            list-style-type: numbers;
            padding-left: 30px;
        }

        ul {
            list-style-type: none;
            padding-left: 30px;
            li::before {
                content: "• ";
                color: black;
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }
        }

        p, h4 {
            margin-top: 1em;
            margin-bottom: 1em;
        }

        h4 {
            font-weight: bold;
            font-size: 1.2em;
        }

        a {
          text-decoration: underline;

          :hover {
            color: blue;
          }
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
            <Layout
                title={postData.title}
                description={postData.extraPostInfo.authorExcerpt}
                previewImage={postData.extraPostInfo.previewImage}
                uri={postData.uri}
                canonical={postData.extraPostInfo.canonical || `blog${postData.uri}`}
            >
            <div className="flex justify-center">
                <div className="w-9/12">
                    <div className={styles.container}>
                        <main className={styles.main}>
                            {router.isFallback ? (
                                <h2>Loading...</h2>
                            ) : (
                                <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                                    <div className={blogStyles.postmeta}>
                                        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mt-8 mb-4 text-black dark:text-white">
                                            {postData.title}
                                        </h1>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
                                            <div className="flex items-center">
                                                <Link href={`/user/author/${postData.author.node.id}`}>
                                                    <Image
                                                    alt={postData.author.node.name}
                                                    height={24}
                                                    width={24}
                                                    src={postData.author.node.imageURL}
                                                    className="rounded-full"
                                                    />
                                                </Link>
                                                <p className="text-base text-gray-700 ml-1">
                                                    <Link href={`/user/author/${postData.author.node.id}`}>
                                                        {postData.author.node.name}
                                                    </Link>
                                                    {` / `}
                                                    {format(parseISO(postData.date), 'MMMM dd, yyyy')}
                                                </p>
                                            </div>
                                        </div>
                                        <img
                                            className="mt-4"
                                            src={postData.featuredImage?.node.sourceUrl}
                                        />
                                    </div>
                                    <div
                                        className="blogPostBodyText"
                                        dangerouslySetInnerHTML={{ __html: postData.content }}
                                    />
                                    <p className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        <Link href={`/blog`}>
                                            <a>Back</a>
                                        </Link>
                                    </p>
                                </article>
                            )}
                        </main>
                    </div>
                </div>
                <div className="h-screen sticky top-0 w-3/12 hidden md:block mr-36">
                    <SideBar
                        url={`https://realmprojectau.com/blog${postData.uri}`}
                        imageurl={postData.extraPostInfo.previewImage}
                        title={postData.title}
                        quote={postData.extraPostInfo.authorExcerpt}
                    />
                </div>
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

const findImage = (id, fbJSON) => {
    const user = fbJSON.usersData.find(data => data.wpID === id);
    if (user) {
        return user.imageURL;
    } else {
        return '';
    }
}

const result = (wpJSON, fbJSON) => {
    const imageURL = findImage(wpJSON.author.node.id, fbJSON);
    if (imageURL) {
        wpJSON.author.node['imageURL'] = imageURL;
    } else {
        wpJSON.author.node['imageURL'] = 'https://res.cloudinary.com/dkd4xa60a/image/upload/v1622025941/REALM/istockphoto-1016744034-612x612_ajt0jr.jpg';
    }

    return wpJSON;
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: POST,
            variables: {
                id: params.slug,
                idType: 'SLUG'
            }
        });

    const users = await db.collection('users').orderBy('name').get();
    const usersData = users.docs.map(user => ({
        id: user.id,
        ...user.data()
    }));

    const updatedData = result(data?.post, {usersData});


    return {
      props: {
        postData: updatedData
      },
      revalidate: 1
    };
  }