import SocialIcons from './social/index'
import EmailCollectionFooter from '../../email/emailCollectionFooter'

const Footer = () => {
    return (
      <footer className="relative bg-gray-900 pt-8 pb-6">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
        style={{ height: "80px" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-300 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-4/12 px-4">
            <div className="mt-6">
              <SocialIcons />
            </div>
          </div>
          <div className="w-full lg:w-8/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-5/12 px-4 ml-auto">
                <EmailCollectionFooter />
                <ul className="list-unstyled">
                  <li>
                    <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white"
                        href="https://www.creative-tim.com/presentation">About
                    </a>
                  </li>
                  <li>
                    <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white"
                        href="https://blog.creative-tim.com">Membership
                    </a>
                  </li>
                  <li>
                    <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white"
                        href="https://www.github.com/creativetimofficial">Living Truthfully
                    </a>
                  </li>
                  <li>
                    <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white"
                        href="https://www.creative-tim.com/bootstrap-themes/free">Essays
                    </a>
                  </li>

                </ul>
              </div>
              <div className="w-full lg:w-7/12 px-4">
                <span className="text-white font-semibold block pb-2 text-sm">
                  <h2 className="block uppercase text-sm text-gray-300 font-semibold mb-2">Who are we?</h2>
                  <p className="text-gray-300" >REALM explores psychology, philosophy & literature aimed towards virtue. Better people make better societies; our only goal is to help individuals live truthfully.</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" "}Realm Project by{" "}
              <a
                href="https://www.creative-tim.com"
                className="text-gray-600 hover:text-gray-900"
              >
                REALM
              </a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
    )
};

export default Footer;