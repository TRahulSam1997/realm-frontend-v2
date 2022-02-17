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
              <div className="flex flex-wrap mt-10 justify-center">
              <div className="m-3">
                <a href="https://youtube.com/playlist?list=PLcJ6nqGscKrcGHWMcVpNzDpk6FfzuDKA-" target="_blank" title="Inner REALM On YouTube"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-red-600 hover:border-red-600 hover:bg-red-600  hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">YouTube</span>
                </a>
              </div>
              <div className="m-3">
                <a href="https://open.spotify.com/show/4ryEqjut4r6SMtfxLdM1Le" target="_blank" title="REALM On Twitter"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">Spotify</span>
                </a>
              </div>
              <div className="m-3">
                {/* test test */}
                <a href="https://anchor.fm/rahul-samaranayake" target="_blank" title="REALM On Pinterest"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-purple-600 hover:border-purple-600 hover:bg-purple-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">Anchor</span>
                </a>
              </div>
              <div className="m-3">
                <a href="https://podcastindex.org/podcast/4985698" target="_blank" title="REALM On Facebook"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-black hover:border-orange-500 hover:bg-black hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">P. Index</span>
                </a>
              </div>
            </div>
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
