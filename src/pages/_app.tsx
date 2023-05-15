import "@/styles/globals.css";
import { AppProvider } from "@/components/AppState.js";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="nightwind-mode"
      defaultTheme="light" // default "light"
    >
      <AppProvider>
        <Component {...pageProps} />
        <Analytics />
      </AppProvider>
    </ThemeProvider>
  );
}
