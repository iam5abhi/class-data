import Header from '../components/Header/Header'
import 'tailwindcss/tailwind.css'
import '../style/globle.css'
import 'react-quill/dist/quill.snow.css';
import Head from 'next/head';
import React, {useEffect } from 'react';
import ReactGA from 'react-ga';
const TRACKING_ID = "G-145K8ZM6EW"; // OUR_TRACKING_ID


ReactGA.initialize(TRACKING_ID);
function MyApp({ Component, pageProps }) {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
 
  return(
      <>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4914031929849543"
          crossorigin="anonymous"></script>
          {/* <!-- Google tag (gtag.js) --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-145K8ZM6EW"></script>
        </Head>
        <Header />
        <Component {...pageProps} />
      </> 
  )
}

export default MyApp
