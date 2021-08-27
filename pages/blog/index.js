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
    const imageURL = findImage(edge.node.author.node.id, fbJSON);
    if (imageURL) {
      edge.node.author.node['imageURL'] = imageURL;
    } else {
      edge.node.author.node['imageURL'] = 'https://res.cloudinary.com/dkd4xa60a/image/upload/v1622025941/REALM/istockphoto-1016744034-612x612_ajt0jr.jpg';
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

    console.log(updatedDate.edges[0].node.author.node.imageURL);
    console.log(updatedDate.edges[1]);

    return {
      props: {
        allPosts: updatedDate
      },
      revalidate: 1
    };
  }