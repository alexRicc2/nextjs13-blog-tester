import { fetchAPI } from "../../api";
import { normalizePost } from "@/utils/Normalize";

type parameters = {
  perPage: number;
  offset: number | null;
};

export async function getPosts({ perPage, offset }: parameters) {
  const data = await fetchAPI(`
  
  query GET_POSTS( $perPage: Int, $offset: Int ) {
    posts: posts(where: { offsetPagination: { size: $perPage, offset: $offset }}) {
      edges {
        node {
          date
          modified
          id
          title
          excerpt
          slug
          categories{
            edges{
              node{
                name
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
      perPage: perPage,
      offset: offset,
    },
  });
  data?.posts?.edges?.forEach(({node}: any) => {
    normalizePost(node)
  });
  return data
}
