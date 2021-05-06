import Posts from '../../components/blog/posts';
import {useState} from 'react';
import {PER_PAGE_FIRST} from '../../utils/pagination';
import { useLazyQuery } from '@apollo/client';

const LoadMorePosts = ( { posts } ) => {
    return (
        <>
            <Posts edges={posts.edges}/>
        </>
    )
}

export default LoadMorePosts;