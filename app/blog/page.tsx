import { getAllPosts, getPosts } from "../../lib/api";
import PostPreview from "../../components/PostPreview";
import Link from "next/link";

export default async function Blog() {
  // const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
  const data = await getPosts()
  return (  
    <div className="container mx-auto px-5">
      <main>
        <h1 className="text-center text-3xl">All Posts</h1>

        <div className="h-12"></div>

        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-32 gap-8">
          {data.posts.edges.map(({node}: any, i: any) => (
            <div key={i}>
              <Link href={`/posts/${node.slug}`}>
              {node.title}
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
