import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faMedium } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <footer className="relative bg-gray-300 pt-8 pb-6">
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
            <div className="w-full lg:w-6/12 px-4">
                <div className="mt-6">
                    <div className="social-menu">
                        <ul className="list-unstyled list-inline text-center">
                            <li className="list-inline-item">
                                <a className="btn-floating btn-facebook mx-1" href="https://www.facebook.com/">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-twitter mx-1" href="https://twitter.com/explore">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-instagram mx-1" href="https://www.instagram.com/realm.project/">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-linkedin mx-1" href="https://www.linkedin.com/company/18713097/">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-youtube mx-1" href="https://www.youtube.com/rahulsam/">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a className="btn-floating btn-medium mx-1" href="https://medium.com/@trahulsam/">
                                    <FontAwesomeIcon icon={faMedium} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
                <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                    <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    Useful Links
                    </span>
                    <ul className="list-unstyled">
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://www.creative-tim.com/presentation">About Us
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://blog.creative-tim.com">Blog
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://www.github.com/creativetimofficial">Github
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://www.creative-tim.com/bootstrap-themes/free">Free Products
                        </a>
                    </li>

                    </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
                    Other Resources
                    </span>
                    <ul className="list-unstyled">
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md">MIT License
                    </a>
                    </li>
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://creative-tim.com/terms">Terms & Conditions
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://creative-tim.com/privacy">Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                            href="https://creative-tim.com/contact-us">Contact Us
                        </a>
                    </li>
                    </ul>

                </div>
                </div>
            </div>
            </div>
            <hr className="my-6 border-gray-400" />
            <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                <div className="text-sm text-gray-600 font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}realmprojectau.com by{" "}
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