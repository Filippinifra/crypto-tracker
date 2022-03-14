import { ToastContainer } from "components/ToastContainer";
import { ToastProvider } from "contexts/ToastContext";
import Head from "next/head";
import { AuthProvider } from "contexts/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Head>
          <style>{"@import url('https://fonts.googleapis.com/css2?family=Quicksand&family=Roboto:wght@400;500;700;900&display=swap');"}</style>
          <style>{"@import url('https://fonts.googleapis.com/icon?family=Material+Icons');"}</style>
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

          * {
            font-family: "Roboto";
          }
        `}</style>
        <ToastContainer />
      </ToastProvider>
    </AuthProvider>
  );
};

export default MyApp;
