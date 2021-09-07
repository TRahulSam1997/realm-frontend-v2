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
    #website {
        :hover {
            text-decoration: underline;
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
                title={postData.edges[0].node.author.node.name}
                description={postData.edges[0].node.author.node.bio}
                previewImage={postData.edges[0].node.author.node.imageURL}
                uri={`/user/author/${postData.edges[0].node.author.node.id}`}
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
                                        <p className="text-2xl text-gray-800 text-center md:text-left mb-8" id="website">
                                            <a href={postData.edges[0].node.author.node.website} target="_blank">{postData.edges[0].node.author.node.website}</a>
                                        </p>
                                        <p className="text-xl text-gray-800 text-center md:text-left mb-8">
                                            {postData.edges[0].node.author.node.bio}
                                        </p>
                                        <a href={postData.edges[0].node.author.node.twitter} target="_blank" className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">Follow&nbsp;<FontAwesomeIcon icon={faTwitter} id="twitter"/></a>
                                    </div>
                                </div>
                                <section className="container mx-auto w-4/6 mb-20">
                                    <hr />
                                    {postData.edges.map(({ node }) => (
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
                                                <Link href={`/user/author/${node.author.node.id}`}>
                                                    <div className="flex mt-3">
                                                    <img src={node.author.node.imageURL}
                                                        className="h-10 w-10 rounded-full mr-2 object-cover" />
                                                    <div>
                                                        <p className="font-semibold text-gray-700 text-sm capitalize"> {node.author.node.name} </p>
                                                        <p className="text-gray-600 text-xs">{format(parseISO((node.date).split('T')[0]), 'MMMM dd, yyyy')}</p>
                                                    </div>
                                                    </div>
                                                </Link>
                                                </div>
                                            </a>
                                            </Link>
                                        </div>
                                        </div>
                                    </main>
                                    ))}
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

const findKey = (id, fbJSON, keyValue) => {
    const user = fbJSON.usersData.find(data => data.wpID === id);
    if (user) {
        return user[keyValue];
    } else {
        return '';
    }
}

const result = (wpJSON, fbJSON) => {
    const imageURL = findKey(wpJSON.edges[0].node.author.node.id, fbJSON, 'imageURL');
    if (imageURL) {
        wpJSON.edges[0].node.author.node['imageURL'] = imageURL;
    } else {
        wpJSON.edges[0].node.author.node['imageURL'] = 'https://res.cloudinary.com/dkd4xa60a/image/upload/v1622025941/REALM/istockphoto-1016744034-612x612_ajt0jr.jpg';
    }

    const bio = findKey(wpJSON.edges[0].node.author.node.id, fbJSON, 'bio');
    if (bio) {
        wpJSON.edges[0].node.author.node['bio'] = bio;
    } else {
        wpJSON.edges[0].node.author.node['bio'] = '';
    }

    const twitter = findKey(wpJSON.edges[0].node.author.node.id, fbJSON, 'twitter');
    if (twitter) {
        wpJSON.edges[0].node.author.node['twitter'] = twitter;
    } else {
        wpJSON.edges[0].node.author.node['twitter'] = '';
    }

    const website = findKey(wpJSON.edges[0].node.author.node.id, fbJSON, 'website');
    if (website) {
        wpJSON.edges[0].node.author.node['website'] = website;
    } else {
        wpJSON.edges[0].node.author.node['website'] = '';
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