import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "./_app.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
