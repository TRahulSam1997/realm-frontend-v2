import styles from '../../../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import {isEmpty, isArray} from 'lodash';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

const Posts = ( { edges } ) => {
    if ( isEmpty( edges ) && ! isArray( edges ) ) {
		return null;
	}
    return (
        <div className={styles.container}>
            <Head>
                <title>Essays</title>
                <link rel='icon' href='https://res.cloudinary.com/dkd4xa60a/image/upload/v1618225098/REALM/logo192_mxoxsc.jpg' />
            </Head>

            <main className={styles.main}>
                <section className="w-4/6 mb-20 mt-20">
                    {edges.map(({ node }) => (
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
                                            <div className="flex mt-3">
                                                <img src={node.author.node.imageURL}
                                                    className="h-10 w-10 rounded-full mr-2 object-cover" />
                                                <div>
                                                    <p className="font-semibold text-gray-700 text-sm capitalize"> {node.author.node.name} </p>
                                                    <p className="text-gray-600 text-xs">{format(parseISO((node.date).split('T')[0]), 'MMMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    </Link>
                                </div>
                            </div>
                        </main>
                    ))}
                </section>
            </main>
        </div>
    )
}

Posts.propTypes = {
	posts: PropTypes.array
};

Posts.defaultProps = {
	posts: []
};

export default Posts;