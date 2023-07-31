import WPPAGE from "../../components/WPPage";
import { getPageData } from "../../lib/queries/Page/getPageData";
import { getPostAndMorePosts, getPostTest } from "../../lib/queries/Post/getPostAndMorePosts";
import transformContentUrls from "../../utils/transformContentURLs";
import Post from "../../components/Post";
import { getAllPostsWithSlug } from "../../lib/queries/Post/getAllPostsWithSlug";
import { getPages } from "../../lib/queries/Page/getPages";

export async function generateStaticParams() {
  const allPosts = await getAllPostsWithSlug();
  // const allPostsTitle = await getAllPostsTitle();
  // const allPages = await getPages();

  const allPostsPaths = allPosts.map(({ post }: any) => { return { slug: post.slug } });
  // const allPagesPaths = allPages.map(({ page }: any) => {return {slug: page.slug}});

  const allPaths = [...allPostsPaths];
  return allPaths
}


export default async function Page({ params }: { params: { slug: string } }) {
  // const data = await getPostAndMorePosts(params?.slug, false, null);
  const data = await getPostTest(params?.slug);
  // const pageData = await getPageData(params?.slug);

  // if (data?.post === undefined && !pageData?.page) return { notFound: true };
  if (data?.post?.content)
    data.post.content = transformContentUrls(data?.post?.content);

  const post = data?.post ?? null
  const posts = data?.posts ?? null
  const relatedPosts = data?.relatedPosts ?? null

  const isPost = data?.post !== undefined;



  return (
    <div>
      {/* {isPost ? (
        <Post post={post} posts={posts} relatedPosts={relatedPosts} />
      ) : (
        <WPPAGE pageData={pageData} />
      )} */}
      {data.post.title}
    </div>
  );
}
