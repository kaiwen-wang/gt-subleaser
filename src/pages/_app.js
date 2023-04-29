import '@/styles/globals.css'
import { AppProvider } from '/src/components/AppState.js'
import { ThemeProvider } from 'next-themes'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())


  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <ThemeProvider
        attribute="class"
        storageKey="nightwind-mode"
        defaultTheme="system" // default "light"
      >
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider >
      </ThemeProvider>
    </SessionContextProvider>

  )

}
