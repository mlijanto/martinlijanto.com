import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import "../static/css/normalize.css";
import "../static/css/global.css";

export default class Site extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Martin Lijanto</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png" />
          <link rel="manifest" href="/public/site.webmanifest" />
          <link rel="mask-icon" href="/public/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="icon" href="/public/favicon.ico" />
          <meta name="msapplication-TileColor" content="#181818" />
          <meta name="msapplication-config" content="/public/browserconfig.xml" />
          <meta name="theme-color" content="#181818" />
          <meta property="og:image" content="/public/ml-og.png" />
          <meta property="og:description" content="The personal site of Martin Lijanto." />
          <meta property="og:title" content="Martin Lijanto" />
          <meta name="twitter:title" content="Martin Lijanto" />
        </Head>
        <Container>
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}
