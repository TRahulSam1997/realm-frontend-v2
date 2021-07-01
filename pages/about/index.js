import React from 'react';
import Layout from '../../src/components/layout/index'
import ABOUT from '../../lib/queries/pages/about'
import client from '../../lib/apollo/client'
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'

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

        h2 {
            margin-top: 1em;
            margin-bottom: 1em;
            font-size: 1.5em;
            font-style: bold;
        }

        a {
          text-decoration: underline;

          :hover {
            color: blue;
          }
        }
    }
`

export default function About ({ pageData }) {
  return (
    <Styles>
      <Layout
            title="About"
            description="REALM explores psychology, philosophy, literature & religion aimed towards virtue. Better people make better societies; our goal is to help individuals live truthfully."
            previewImage="https://res.cloudinary.com/dkd4xa60a/image/upload/v1623412100/REALM/socrates.jpg"
            uri={pageData.uri}
      >
        <main className={styles.main}>
          <h1
            className="font-bold text-3xl md:text-5xl tracking-tight mt-8 mb-4 text-black dark:text-white"
          >
            About
          </h1>
          <div className="w-8/12 mb-32">
            <div
              dangerouslySetInnerHTML={{ __html: pageData.content }}
              className="blogPostBodyText"
            />
          </div>
        </main>
      </Layout>
    </Styles>

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