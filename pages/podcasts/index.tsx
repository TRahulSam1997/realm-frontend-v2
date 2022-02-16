import React from 'react'
import Layout from '../../src/components/layout/index'

export default function index() {
  return (
    <Layout title="Podcasts" description={undefined} previewImage={undefined} uri={undefined} canonical={undefined}>
      <div className="flex items-center justify-center m-10 mb-20 h-screen bg-white">
        <div className="container">
          <div className="bg-gray-300 rounded-lg shadow-lg p-5 md:p-20 mx-2">
            <div className="text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
                Inner<span className="text-gray-900">REALM</span> <span className="text-white text-3xl">Podcast</span>
              </h2>
              <div className="flex items-center justify-center m-10">
                <iframe src="https://anchor.fm/rahul-samaranayake/embed" height="102px" width="600px" frameBorder="0" scrolling="no"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
