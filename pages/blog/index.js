import React from 'react';
import client from '../../lib/apollo/client';
import ALL_POSTS from '../../lib/queries/allposts';
import { PER_PAGE_FIRST } from '../../src/utils/pagination';
import LoadMorePosts from '../../src/components/blog/loadMorePosts';

const Blog = ({ allPosts: posts  }) => {
  return (
    <div>
        <LoadMorePosts posts={posts}>

        </LoadMorePosts>
    </div>

  )
};

export default Blog;

export async function getStaticProps() {

    const { data } = await client.query({
        query: ALL_POSTS,
        variables: {
			first: PER_PAGE_FIRST,
			after: null,
		}
    });

    return {
      props: {
        allPosts: data?.posts
      },
      revalidate: 1
    };
  }