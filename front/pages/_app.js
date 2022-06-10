import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
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