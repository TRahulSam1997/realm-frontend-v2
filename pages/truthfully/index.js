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
      <Layout>
        <Head>
          {/* Primary Meta Tags */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="test test" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@REALM" />
          <meta name="twitter:title" content="What is Living Truthfully?" />
          <meta name="twitter:description" content="test test" />
          <meta name="twitter:image" content="https://res.cloudinary.com/dkd4xa60a/image/upload/v1623412100/REALM/David_-_The_Death_of_Socrates_iqzfie.jpg" />

          {/* Open Graph / Facebook */}
          <meta property="og:url" content="test test" />
          <meta property="og:image" content="https://res.cloudinary.com/dkd4xa60a/image/upload/v1623412100/REALM/David_-_The_Death_of_Socrates_iqzfie.jpg" />
          <meta property="og:site_name" content="REALM" />
          <meta property="og:title" content="What is Living Truthfully?" />
          <meta property="og:description" content="test test" />

          <title>What is Living Truthfully?</title>
        </Head>
        <main className={styles.main}>
          <h1
            className="font-bold text-3xl md:text-5xl tracking-tight mt-8 mb-8 text-black dark:text-white"
          >
            What is Living Truthfully?
          </h1>
          <img
            src="https://res.cloudinary.com/dkd4xa60a/image/upload/v1623412100/REALM/David_-_The_Death_of_Socrates_iqzfie.jpg"
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