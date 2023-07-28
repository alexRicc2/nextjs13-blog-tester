import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      
      <link rel="icon" href="/favicon/ultatel-favicon.png" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#fff" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      {/* <meta
        name="description"
        content={`TSH website ${CMS_NAME}.`}
      /> */}
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
    </Head>
  )
}
