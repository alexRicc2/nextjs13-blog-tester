import { fetchAPI } from "../../api";
import { normalizePost } from "@/utils/Normalize";

export async function getAllPostsTalkOfTown() {
  const data = await fetchAPI(
    `
    query GET_POSTS{
      posts: posts(
        first: 20
        where: { orderby: { field: DATE, order: DESC } }
      ) {
        edges {
          node {
            date
            modified
            id
            title
            excerpt
            slug
            
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
                slug
              }
            }
            featuredImage {
              node {
                sourceUrl(size: MEDIUM_LARGE)
                altText
              }
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }
    `
  );

  const posts = data?.posts?.edges.map(({ node }: any) => ({
    node: normalizePost(node),
  }));

  // Shuffle the array to get a random order
  const shuffledPosts = posts.sort(() => Math.random() - 0.5);

  // Sort the shuffled posts by date in descending order
  const sortedPosts = shuffledPosts.slice(1,5).sort(
    (a: any, b: any) =>
      new Date(b.node.date).getTime() - new Date(a.node.date).getTime()
  );


  return { ...data, posts: { edges: shuffledPosts } };
}
