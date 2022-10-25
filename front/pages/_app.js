import Navbar from "../components/navbar";
import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import "../styles/styles.css";
function MainApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </React.Fragment>
  );
}

export default MainApp;
