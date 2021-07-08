import React from 'react';
import Layout from '../../src/components/layout/index'

const Membership = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center m-10 mb-20 h-screen bg-white">
        <div className="container">
          <div className="bg-gray-300 rounded-lg shadow-lg p-5 md:p-20 mx-2">
            <div className="text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
                Inner<span className="text-gray-900">REALM</span>
              </h2>
              <h3 className='text-xl md:text-3xl mt-10'>Coming soon!</h3>
              <p className="text-md md:text-xl mt-10">
                Salons, workshop, exclusive pieces & mentorship.
              </p>
            </div>
            <div className="flex flex-wrap mt-10 justify-center">
              <div className="m-3">
                <a href="https://www.facebook.com/REALM-111744604506248" title="Quicktoolz On Facebook"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">Facebook</span>
                </a>
              </div>
              <div className="m-3">
                <a href="https://twitter.com/" title="Quicktoolz On Twitter"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">Twitter</span>
                </a>
              </div>
              <div className="m-3">
                <a href="https://www.instagram.com/realm.project/" title="Quicktoolz On Pinterest"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">Instagram</span>
                </a>
              </div>
              <div className="m-3">
                <a href="https://medium.com/@trahulsam/" title="Quicktoolz On Facebook"
                  className="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-black hover:border-orange-500 hover:bg-black hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                  <span className="mx-auto">Medium</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
};

export default Membership;