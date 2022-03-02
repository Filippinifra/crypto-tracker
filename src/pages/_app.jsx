import { AuthProvider } from "contexts/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default MyApp;
