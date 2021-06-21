import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = React.useState(() => new QueryClient());

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <React.Fragment>
          <Head>
            <title>My page</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </React.Fragment>
      </Hydrate>
    </QueryClientProvider>
  );
}
