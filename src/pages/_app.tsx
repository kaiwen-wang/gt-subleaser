import "@/styles/globals.css";
import { AppProvider } from "@/components/AppState.js";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
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
    </SessionContextProvider>
  );
}
