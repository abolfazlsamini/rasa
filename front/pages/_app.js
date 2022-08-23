import Navbar from '../components/navbar'
import React from "react";

function MainApp({ Component, pageProps }) {
  return (
    <React.Fragment>


      <Navbar/>

      <Component {...pageProps} />

    </React.Fragment>
  )
}


export default MainApp