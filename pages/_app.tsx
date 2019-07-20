import React from "react";
import App, { Container } from "next/app";
import "../static/css/normalize.css";
import "../static/css/global.css";

export default class Site extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
