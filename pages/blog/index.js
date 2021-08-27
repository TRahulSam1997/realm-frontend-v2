import React from 'react';
import client from '../../lib/apollo/client';
import ALL_POSTS from '../../lib/queries/blog/allposts';
import { PER_PAGE_FIRST } from '../../src/utils/pagination';
import LoadMorePosts from '../../src/components/blog/loadMorePosts';
import Layout from '../../src/components/layout/index'
import db from '../../src/utils/db';

const Blog = ({ allPosts: posts  }) => {
  return (
    <Layout>
        <LoadMorePosts posts={posts} />
    </Layout>

  )
};

export default Blog;

const findImage = (id, fbJSON) => {
  const user = fbJSON.usersData.find(data => data.wpID === id);
  if (user) {
    return user.imageURL;
  } else {
    return '';
  }
}

const result = (wpJSON, fbJSON) => {
  wpJSON.edges.forEach(edge => {
    const imageURL = findImage(edge.node.id, fbJSON);
    if (imageURL) {
      edge.node.author.node['imageURL'] = imageURL;
    } else {
      edge.node.author.node['imageURL'] = 'https://bit.ly/3sUszSK';
    }
  });

  return wpJSON;
}

export async function getStaticProps() {

    const { data } = await client.query({
        query: ALL_POSTS,
        variables: {
			first: PER_PAGE_FIRST,
			after: null,
		}
    });

    const users = await db.collection('users').orderBy('name').get();
    const usersData = users.docs.map(user => ({
      id: user.id,
      ...user.data()
    }));

    const updatedDate = result(data?.posts, {usersData});

    return {
      props: {
        allPosts: updatedDate
      },
      revalidate: 1
    };
  }