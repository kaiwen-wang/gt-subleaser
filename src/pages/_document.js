import { Html, Head, Main, NextScript } from 'next/document'

import nightwind from 'nightwind/helper'

export default function Document() {
  return (
    <Html lang="en" className="nightwind">
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
