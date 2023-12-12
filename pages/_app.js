import "@/styles/globals.css";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
// import '@fontsource/inter';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head> */}
      <CssVarsProvider theme={extendTheme({ cssVarPrefix: "company" })}>
        <ClerkProvider {...pageProps}>
          <Navigation />
          <Component {...pageProps} />
        </ClerkProvider>
      </CssVarsProvider>
    </>
  );
}
