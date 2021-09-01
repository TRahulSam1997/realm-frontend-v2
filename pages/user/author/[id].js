import { useRouter } from 'next/router';
import Link from 'next/link';
import client from '../../lib/apollo/client'
import AUTHORS_WITH_IDS from '../../../lib/queries/authors/authorswithids'
import AUTHOR from '../../../lib/queries/authors/author'
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';
import styled from 'styled-components';
import Layout from '../../src/components/layout/index'
import { parseISO, format } from 'date-fns';
import Image from 'next/image';
import db from '../../src/utils/db';

export default function Author({ postData }) {
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
            >
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
                                            <Image
                                            alt={postData.author.node.name}
                                            height={24}
                                            width={24}
                                            src={postData.author.node.imageURL}
                                            className="rounded-full"
                                            />
                                            <p className="text-base text-gray-700 ml-1">
                                                {postData.author.node.name} {`/`} {format(parseISO(postData.date), 'MMMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    <img
                                        className="mt-4"
                                        src={postData.featuredImage.node.sourceUrl}
                                    />
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
    const { data } = await client.query({
        query: AUTHORS_WITH_IDS
    });

    if (
        data?.posts &&
        data?.posts.edges !== null &&
        data?.posts.edges.node !== null &&
        data?.posts.edges.length > 0
    ) {
        return {
            paths: data?.posts.edges.map(({ node }) => `/user/author${node.author.node.id}`) || [],
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
        query: AUTHOR,
            variables: {
                id: params.id,
                idType: 'ID'
            }
        });

    const users = await db.collection('users').orderBy('name').get();
    const usersData = users.docs.map(user => ({
        id: user.id,
        ...user.data()
    }));

    const updatedDate = result(data.post, {usersData});


    return {
      props: {
        postData: data.post
      },
      revalidate: 1
    };
  }