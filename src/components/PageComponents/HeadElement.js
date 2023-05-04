import Head from "next/head";

export default function HeadElement({ title, desc }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content="Georgia Tech Subleaser" />
      <meta
        property="og:description"
        content="No spam, modern tech, easy to use. Take a look today!"
      />
      <meta property="og:image" content="public/opengraph.jpeg" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐝</text></svg>"
      />
    </Head>
  );
}
