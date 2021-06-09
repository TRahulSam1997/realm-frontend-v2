import React from 'react';
import Layout from '../../src/components/layout/index'
import EmailCollection from '../../src/components/email/emailCollection'
import styles from '../../styles/Home.module.css'

const Newsletter = () => {
  return (
    <Layout>
      <main className={styles.newsletter}>
        <h1
          className="md:text-7xl p-10 italic font-bold text-gray-900 dark:text-gray-100"
        >
          REALM Weekly
        </h1>
        <p
          className="md:text-1xl italic pb-8"
        >
          You can <span className="underline">unsubscribe</span> anytime and <span className="underline">no spam</span>.
        </p>
        <div className = "w-5/6 h-5/6">
          <EmailCollection />
        </div>
      </main>
    </Layout>

  )
};

export default Newsletter;