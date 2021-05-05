import styles from '../../../styles/Home.module.css';
import blogStyles from '../../../styles/Blog.module.css';
import Head from 'next/head';
import Link from 'next/link';

const Posts = ( {edges} ) => {
    // if ( isEmpty( edges ) && ! isArray( edges ) ) {
	// 	return null;
	// }

    return (
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
    )
}

export default Posts;