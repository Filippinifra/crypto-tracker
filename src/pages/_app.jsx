import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <style>@import url('https://fonts.googleapis.com/css2?family=Quicksand&family=Roboto:wght@400;500;700;900&display=swap');</style>
      </Head>
      <Component {...pageProps} />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: auto;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default MyApp;
