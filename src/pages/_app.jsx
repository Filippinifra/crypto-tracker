import { ToastContainer } from "components/ToastContainer";
import { ToastProvider } from "contexts/ToastContext";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ToastProvider>
      <Head>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Quicksand&family=Roboto:wght@400;500;700;900&display=swap');"}</style>
      </Head>
      <Component {...pageProps} />
      <style global jsx>{`
        html,
        body {
          margin: 0;
        }

        #__next {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      `}</style>
      <ToastContainer />
    </ToastProvider>
  );
};

export default MyApp;
