import Posts from '../../components/blog/posts';
import {useState} from 'react';
import {PER_PAGE_FIRST} from '../../utils/pagination';
import { useLazyQuery } from '@apollo/client';
import LOAD_MORE_POSTS from '../../../lib/queries/blog/loadMorePosts';

const LoadMorePosts = ( { posts } ) => {

    const [ postsData, setPostsData ] = useState( posts?.edges );
	const [ pageInfo, setPageInfo ] = useState( posts?.pageInfo );

	const [ error, setError ] = useState( null );

    const setPosts = ( posts ) => {
		if ( ! posts || ! posts?.edges || ! posts?.pageInfo ) {
			return;
		}

		const newPosts = postsData.concat( posts?.edges );
		setPostsData( newPosts );
		setPageInfo( { ...posts?.pageInfo } );
	};

    const [ fetchPosts, { loading } ] = useLazyQuery( LOAD_MORE_POSTS, {
		notifyOnNetworkStatusChange: true,
		onCompleted: ( data ) => {
			setPosts( data?.posts ?? [] );
		},
		onError: ( error ) => {
			setError( error?.graphQLErrors ?? '' );
		}
	} );

    /**
     * Calls fetchPosts
     *
     * fetchPosts() makes a client side request with the new endcursor info,
     * to get next set of posts.
     *
     * @param {String} endCursor Endcursor used to fetch the next set of posts.
     */

    const loadMoreItems = ( endCursor = null ) => {

		fetchPosts( {
			variables: {
				first: PER_PAGE_FIRST,
				after: endCursor,
			}
		} );
	};

    const { endCursor, hasNextPage } = pageInfo || {};

    return (
        <>
            <Posts edges={posts.edges}/>
            {hasNextPage ? (
				<div className='w-full flex justify-center lg:my-10'>
					{loading ? (
						<div className='flex justify-center w-full border border-white px-3 py-2 my-8'>
                            Loading...
						</div>
					) : (
						<button
							className='flex items-center bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-500 border border-gray-500 px-4 py-3'
							onClick={() => loadMoreItems( endCursor ), () => {console.log(endCursor)}}
						>
                            Load more
						</button>
					)}
				</div>
			) : null}
			{error && <div className='w-full flex justify-center my-10'>No articles available</div>}
        </>
    )
}

export default LoadMorePosts;