import { fetchAPI } from "../../api";

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000) {
        edges {
          post: node {
            slug
          }
        }
      }
    }
    `
  );
  return data?.posts?.edges ?? [];
}
