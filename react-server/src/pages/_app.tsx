
import App from "next/app";
import Head from "next/head";
import React from "react";

export default class MyApp extends App {
  // TODO - convert this to a function?
  // TODO - add session loading

  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Ozone</title>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}