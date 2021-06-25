import Header from './header/index'
import Footer from './footer/index';
import Head from 'next/head';

const Layout = ({children,
                title,
                description,
                previewImage,
                uri
            }) => {
    return (
        <div>
            <Head>
                {/* Primary Meta Tags */}
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content={description || 'REALM'} />
                <link rel='icon' href='/favicon.ico' />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@REALM" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || 'REALM'} />
                <meta name="twitter:image" content={previewImage} />

                {/* Open Graph / Facebook */}
                <meta property="og:url" content={uri} />
                <meta property="og:image" content={previewImage} />
                <meta property="og:site_name" content="REALM" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description || 'REALM'} />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
};

export default Layout;