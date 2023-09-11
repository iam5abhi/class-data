import Header from '../components/Header/Header'
import 'tailwindcss/tailwind.css'
import '../style/globle.css'
import 'react-quill/dist/quill.snow.css';
import Head from 'next/head';
import GoogleAnalytics from "@bradgarropy/next-google-analytics"


function MyApp({ Component, pageProps }) {
 
  return(
      <>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <Header />
        <GoogleAnalytics measurementId="G-KDLXEFRJVX" />
        <Component {...pageProps} />
      </> 
  )
}

export default MyApp
