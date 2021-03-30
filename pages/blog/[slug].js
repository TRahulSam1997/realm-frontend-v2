import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPostsWithSlug, getPost } from '../../lib/api';

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
                        </div>
                    </article>
                )}
            </main>
        </div>
    )
}