import "@/styles/globals.css";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";
// import '@fontsource/inter';
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssVarsProvider theme={extendTheme({ cssVarPrefix: "company" })}>
        <ClerkProvider {...pageProps}>
          <Toaster />
          <Navigation />
          <Component {...pageProps} />
        </ClerkProvider>
      </CssVarsProvider>
    </>
  );
}
