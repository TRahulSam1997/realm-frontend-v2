import { ApolloProvider } from '@apollo/client'
import client from '../lib/apollo/client'
import '../styles/globals.css'
import LogRocket from 'logrocket';
import Router from 'next/router';
import NProgress from 'nprogress';

LogRocket.init('lrslof/realm');
NProgress.configure( { showSpinner: false } );
Router.events.on( 'routeChangeStart', () => NProgress.start() );
Router.events.on( 'routeChangeComplete', () => NProgress.done() );
Router.events.on( 'routeChangeError', () => NProgress.done() );

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
