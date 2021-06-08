import React from 'react';
import Layout from '../../src/components/layout/index'
import ABOUT from '../../lib/queries/pages/about'
import client from '../../lib/apollo/client'

export default function About ({ pageData }) {
  return (
    <Layout>
        <h1
          className="font-bold text-3xl md:text-5xl tracking-tight mt-8 mb-4 text-black dark:text-white"
        >
          About
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        />
    </Layout>

  )
};

export async function getStaticProps() {
  const { data } = await client.query({
      query: ABOUT
    });

  return {
    props: {
      pageData: data.page
    },
    revalidate: 1
  };
}