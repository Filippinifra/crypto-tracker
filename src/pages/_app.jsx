import { ToastContainer } from "components/ToastContainer";
import { ToastProvider } from "contexts/ToastContext";
import Head from "next/head";
import { AuthProvider } from "contexts/AuthContext";
import { LanguageProvider } from "contexts/LanguageContext";
import { RoutesHandler } from "components/RoutesHandler";
/*eslint-disable-next-line */
import i18n from "utils/i18next";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Crypto Tracker</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no" />
      </Head>
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
      <AuthProvider>
        <ToastProvider>
          <LanguageProvider>
            <RoutesHandler>
              <Component {...pageProps} />
              <ToastContainer />
            </RoutesHandler>
          </LanguageProvider>
        </ToastProvider>
      </AuthProvider>
    </>
  );
};

export default MyApp;
