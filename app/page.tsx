import Link from "next/link";
import { getPageContent } from "../lib/queries/Page/getPageContent";
import FeaturedPost from "../components/FeaturedPost";
import PostsSection from "../components/PostsSection";
import EmphasisPost from "../components/EmphasisPost";
import CategoriesSection from "../components/CategoriesSection";
import Pagination from "../components/Pagination";

export default async function Home() {
  const pageData = await getPageContent();
  // console.log('homepageseo', homePageDataSeo)
  return (
    <div >
     
     <FeaturedPost posts={pageData.section1.posts} />
      <PostsSection data={pageData.section2} />
      <EmphasisPost data={pageData.section3} />
      <PostsSection data={pageData.section4} />
      <PostsSection data={pageData.section5} />
      <CategoriesSection data={pageData.section6} />
      {/* <Pagination pagesCount={pagesCount} root /> */}
    </div>
  );
}
