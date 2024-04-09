import type { AppProps } from "next/app";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import GlobalStyle from "@/components/globalstyles";
import { StateProvider } from '../utils/store';
import { Analytics } from '@vercel/analytics/react';

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <Analytics />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </StateProvider>
  );
}
