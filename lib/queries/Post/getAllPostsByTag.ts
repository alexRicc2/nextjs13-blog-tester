import { normalizePost } from "../../../utils/Normalize";
import { fetchAPI } from "../../api";

type Params = {
  tagName: string | undefined | string[];
  offset: null | number;
  perPage: number;
};

export async function getAllPostsByTag({ tagName, offset, perPage }: Params) {
  const data = await fetchAPI(
    `
  query NewQuery($tag: String, $offset: Int, $perPage: Int) {
    posts(where: {tag: $tag , offsetPagination: {offset: $offset, size: $perPage}} ) {
      edges{

        node {
          date
          modified
          id
          title
          excerpt
          slug
          content
          tags (first: 2) {
            edges {
              node {
                name
                id
                slug
              }
            }
          }
          author{
            node{
              avatar{
                url
              }
              name
              slug
            }
          }
          featuredImage{
            node{
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
  `,
    {
      variables: {
        tag: tagName,
        offset,
        perPage,
      },
    }
  );
  data?.posts?.edges?.map(({ node }: any) => {
    return { node: normalizePost(node) };
  });
  return data ?? {};
}
