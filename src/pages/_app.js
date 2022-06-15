import { Layout } from "~components"
import Router from "next/router";
import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/react-modal-video/css/modal-video.min.css";
import "~fonts/fontawesome-5/css/all.min.css";
import "~styled/scss/bootstrap.scss";
import "~styled/scss/global.scss";
import { GlobalHeaderProvider , GlobalHeaderContext} from "../context/GlobalHeaderContext";
import { useEffect, useState } from "react";

// alert react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  
  const [loader,setLoader] = useState(true)
  useEffect(() => {
    setTimeout(function(){
      setLoader(false);
    } , 2000);
  }, []);

  Router.onRouteChangeStart = (url) => {
    // Some page has started loading
    setLoader(true) 
  };

  Router.onRouteChangeComplete = (url) => {
    // Some page has finished loading
    // setTimeout(setLoader(false) , 1000) // set state to pass to loader prop
  };
  // if(loader){
  //   return(<Loader show={loader}/>)
  // }
  return(
    <GlobalHeaderProvider>
      <Layout>
        {/* <Loader show={loader}/> */}
        <Component {...pageProps} />
      </Layout>
      <ToastContainer/>
    </GlobalHeaderProvider>
  )
}
  
export default MyApp