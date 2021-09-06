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
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                            <article className="flex flex-col justify-center items-start max-w-8xl mx-auto mb-16 w-full">
                                <div className="container mx-auto mt-8 md:mt-0 md:space-x-10 md:grid grid-cols-3 justify-center md:py-40">
                                    <div className="grid justify-center items-center order-1 col-span-1">
                                        <img className="lg:h-80 md:h-64 h-40 rounded-full" src={postData.edges[0].node.author.node.imageURL} alt={postData.edges[0].node.author.node.name} />
                                    </div>
                                    <div className="mt-8 md:mt-0 lg:justify-end col-span-2">
                                        <h1 className="text-4xl text-gray-800 text-center md:text-left font-bold mb-0.5">{postData.edges[0].node.author.node.name}</h1>
                                        <p className="text-2xl text-gray-800 text-center md:text-left mb-8">
                                            <a href="https://rahulsam.me/">rahulsam.me</a>
                                        </p>
                                        <p className="text-xl text-gray-800 text-center md:text-left mb-8">
                                        I'm a software engineer by profession. My interests lie in computer science (hence the career choice) and the humanities (hence creating REALM and pretty much everything else I do).
                                        </p>
                                        <a href="https://rahulsam.me/" className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">Follow&nbsp;<FontAwesomeIcon icon={faTwitter} id="twitter"/></a>
                                    </div>
                                </div>
                                <section className="container mx-auto w-4/6 mb-20">
                                    <hr />
                                    <main className="mt-10">
                                        <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
                                        <div className="w-3/3">
                                            <Link href={`/blog/${postData.edges[0].node.slug}`}>
                                            <a className="block rounded w-full lg:flex mb-10">
                                                <div
                                                className="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-85"
                                                style={{backgroundImage: `url(${postData.edges[0].node.extraPostInfo.thumbImage})`}}
                                                title={postData.edges[0].node.title}
                                                >
                                                </div>
                                                <div className="bg-white rounded px-4 flex flex-col justify-between leading-normal">
                                                <div
                                                    className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2"
                                                >
                                                    {postData.edges[0].node.title}
                                                </div>
                                                <p
                                                    className="text-gray-700 text-base"
                                                >
                                                    {postData.edges[0].node.extraPostInfo.authorExcerpt}
                                                </p>
                                                <Link href={`/user/author/${postData.edges[0].node.author.node.id}`}>
                                                    <div className="flex mt-3">
                                                    <img src={postData.edges[0].node.author.node.imageURL}
                                                        className="h-10 w-10 rounded-full mr-2 object-cover" />
                                                    <div>
                                                        <p className="font-semibold text-gray-700 text-sm capitalize"> {postData.edges[0].node.author.node.name} </p>
                                                        <p className="text-gray-600 text-xs">{format(parseISO((postData.edges[0].node.date).split('T')[0]), 'MMMM dd, yyyy')}</p>
                                                    </div>
                                                    </div>
                                                </Link>
                                                </div>
                                            </a>
                                            </Link>
                                        </div>
                                        </div>
                                    </main>
                                    <hr />
                                </section>
                            </article>
                        )}
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
    // console.log('value is ' + JSON.stringify(data));

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