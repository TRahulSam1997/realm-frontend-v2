import Link from 'next/link'
import { useState } from 'react';

const Nav = () => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <nav className="flex items-center bg-gray-900 p-3 flex-wrap">
            <a href="#" className="p-2 mr-4 inline-flex items-center">
                <Link href="/">
                        <a>
                            <img src="https://res.cloudinary.com/dkd4xa60a/image/upload/v1618225098/REALM/logo192_mxoxsc.jpg" alt="Site Logo" width="48" height="48" className="mr-4"/>
                        </a>
                </Link>
            </a>
            <button
                className="text-white inline-flex p-3 hover:bg-black rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
                onClick={handleClick}
            >
                <svg className="w-6 h-6 text-gray-300 hover:bg-black hover:text-white"
							x-show="!showMenu"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
				>
					<path d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
            </button>
            <div
                className={`${
                    active ? '' : 'hidden'
                  }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
            >
                <div
                    className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
                >
                    <Link href={'/blog/'}>
                        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white">
                            <span>Essays</span>
                        </a>
                    </Link>
                    <Link href={'/membership/'}>
                        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white">
                            <span>Membership</span>
                        </a>
                    </Link>
                    <Link href={'/newsletter/'}>
                        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white">
                            <span>Newsletter</span>
                        </a>
                    </Link>
                    <Link href={'/podcasts/'}>
                        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white">
                            <span>Podcasts</span>
                        </a>
                    </Link>
                    <Link href={'/truthfully/'}>
                        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-300 items-center justify-center hover:bg-black hover:text-white">
                            <span>Living Truthfully</span>
                        </a>
                    </Link>
                </div>
            </div>

        </nav>

    )
};

export default Nav;