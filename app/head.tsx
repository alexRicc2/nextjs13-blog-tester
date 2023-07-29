import { GET_HOME_PAGE } from "../lib/queries/Page/getHomePageSEO";
import { sanitize } from "../utils/miscellaneous";

export default async function Head() {
  const homePageDataSeo = await GET_HOME_PAGE();
  console.log('homepagedataseo', homePageDataSeo
  )
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      <title> Home - ULTATEL Blog</title>
      <meta name="description" content="ULTATEL BLOG Homepage" />
     
    </>
  );
}
