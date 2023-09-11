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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4914031929849543"
          crossorigin="anonymous"></script>
          
        </Head>
        <Header />
        <GoogleAnalytics measurementId="G-145K8ZM6EW" />
        <Component {...pageProps} />
      </> 
  )
}

export default MyApp
