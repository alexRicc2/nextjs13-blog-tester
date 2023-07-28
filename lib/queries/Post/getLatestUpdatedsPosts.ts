import { fetchAPI } from "../../api";
import { normalizePost } from "../../../utils/Normalize";

export async function getLatestUpdatedsPosts() {
  const data = await fetchAPI(/* GraphQL */ `
    query GET_POSTS {
      posts: posts(
        first: 5
        where: { orderby: { field: MODIFIED, order: DESC } }
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
      }
    }
  `);
  data?.posts?.edges?.forEach(({ node }: any) => {
    normalizePost(node);
  });
  return data;
}
