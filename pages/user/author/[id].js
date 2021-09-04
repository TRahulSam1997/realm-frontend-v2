import { useRouter } from 'next/router';
import Link from 'next/link';
import client from '../../../lib/apollo/client'
import AUTHORS_WITH_IDS from '../../../lib/queries/authors/authorswithids'
import AUTHOR from '../../../lib/queries/authors/author'
import styles from '../../../styles/Home.module.css';
import blogStyles from '../../../styles/Blog.module.css';
import styled from 'styled-components';
import Layout from '../../../src/components/layout/index'
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import db from '../../../src/utils/db';

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

        .wp-block-image, figcaption, .wp-block-embed {
            display: table;
            margin: 0 auto;
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

export default function Author({ postData }) {
    const router = useRouter();

    if (!router.isFallback && !postData?.edges[0]) {
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
                title={postData.edges[0].node.title}
                description={postData.edges[0].node.extraPostInfo.authorExcerpt}
                previewImage={postData.edges[0].node.extraPostInfo.previewImage}
                uri={postData.edges[0].node.uri}
            >
                <div className={styles.container}>

                    <main className={styles.main}>
                        {router.isFallback ? (
                            <h2>Loading...</h2>
                        ) : (
                            <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                                <div className={blogStyles.postmeta}>
                                    <h1 className="font-bold text-3xl md:text-5xl tracking-tight mt-8 mb-4 text-black dark:text-white">
                                        {postData.edges[0].node.title}
                                    </h1>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
                                        <div className="flex items-center">
                                            <Image
                                            alt={postData.edges[0].node.author.name}
                                            height={24}
                                            width={24}
                                            src={postData.edges[0].node.author.node.imageURL}
                                            className="rounded-full"
                                            />
                                            <p className="text-base text-gray-700 ml-1">
                                                {postData.edges[0].node.author.name} {`/`} {format(parseISO(postData.edges[0].node.date), 'MMMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    <img
                                        className="mt-4"
                                        src={postData.edges[0].node.author.node.imageURL}
                                    />
                                </div>
                                {/* <div
                                    className="blogPostBodyText"
                                    dangerouslySetInnerHTML={{ __html: postData.content }}
                                /> */}
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
    const { data } = await client.query({
        query: AUTHORS_WITH_IDS
    });

    if (
        data?.users &&
        data?.users.edges !== null &&
        data?.users.edges.node !== null &&
        data?.users.edges.length > 0
    ) {
        return {
            paths: data?.users.edges.map(({ node }) => `/user/author/${node.id}`) || [],
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
    const imageURL = findImage(wpJSON.edges[0].node.author.node.id, fbJSON);
    if (imageURL) {
        wpJSON.edges[0].node.author.node['imageURL'] = imageURL;
    } else {
        wpJSON.edges[0].node.author.node['imageURL'] = 'https://res.cloudinary.com/dkd4xa60a/image/upload/v1622025941/REALM/istockphoto-1016744034-612x612_ajt0jr.jpg';
    }

    return wpJSON;
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: AUTHOR,
            variables: {
                id: params.id
            }
        });

    // console.log('value is ' + JSON.stringify(data.user.posts));
    console.log('value is ' + JSON.stringify(data));

    const users = await db.collection('users').orderBy('name').get();
    const usersData = users.docs.map(user => ({
        id: user.id,
        ...user.data()
    }));

    let updatedDate = null;
    if (data.user.posts.edges[0] != null) {
        updatedDate = result(data.user?.posts, {usersData});
    }

    return {
      props: {
        postData: updatedDate
      },
      revalidate: 1
    };
}