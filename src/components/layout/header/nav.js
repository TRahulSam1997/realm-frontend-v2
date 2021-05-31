import Link from 'next/link'

const Nav = () => {
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
            data-target="#navigation"
        >
            <i className="material-icons">menu</i>
        </button>
            <div
                className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
                id="navigation"
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