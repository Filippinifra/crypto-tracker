function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          margin: 0;
        }
      `}</style>
    </>
  );
}

export default MyApp;
