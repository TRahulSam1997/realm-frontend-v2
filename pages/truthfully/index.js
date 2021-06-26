import React from 'react';
import Layout from '../../src/components/layout/index'
import LIVING_TRUTHFULLY from '../../lib/queries/pages/livingTruthfully'
import client from '../../lib/apollo/client'
import styles from '../../styles/Home.module.css'
import styled from 'styled-components';
import Head from 'next/head'

const Styles = styled.div`

    .blogPostBodyText {
        width: 100%;
        display: block;
        font-size: 19px;
        text-align: left;
        text-justify: inter-word;
        padding-top: 0.6em;
        padding-bottom: 0.2em;
        /* font-family: libre baskerville, serif; */
        color: black;

        p {
            margin-top: 1em;
            margin-bottom: 1em;
        }
    }
`
export default function Truthfully ({ pageData }) {
  return (
    <Styles>
      <Layout
          title="What is Living Truthfully?"
          description={postData.extraPostInfo.authorExcerpt}
          previewImage="https://res.cloudinary.com/dkd4xa60a/image/upload/v1623412100/REALM/socrates.jpg"
          uri={postData.uri}
      >
          <main className={styles.main}>
            <h1
              className="font-bold text-3xl md:text-5xl tracking-tight mt-8 mb-8 text-black dark:text-white"
            >
              What is Living Truthfully?
            </h1>
            <img
              src="https://res.cloudinary.com/dkd4xa60a/image/upload/v1623412100/REALM/socrates.jpg"
              className="w-8/12"
            />
            <p className="mt-1">The Death of Socrates | Jacques-Louis David 1787.</p>
            <div className="w-8/12 mb-32">
              <div
                dangerouslySetInnerHTML={{ __html: pageData.content }}
                className="blogPostBodyText"
              />
            <p>~ Rahul</p>
            </div>
          </main>
      </Layout>
    </Styles>

  )
};

export async function getStaticProps() {
  const { data } = await client.query({
      query: LIVING_TRUTHFULLY
    });

  return {
    props: {
      pageData: data.page
    },
    revalidate: 1
  };
}