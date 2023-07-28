import { fetchAPI } from "../../api";
import { normalizePost } from "../../../utils/Normalize";

type parameters = {
  search: string | string[] | undefined;
  perPage: number;
  offset: number | null;
};

export async function getAllPostsBySearch({
  search = "",
  perPage,
  offset,
}: parameters) {
  const data = await fetchAPI(
    `
  
  query POSTS_SEARCHED($search: String, $offset: Int, $perPage: Int) {
    posts(
      where: {search: $search, offsetPagination: {offset: $offset, size: $perPage}}
    ) {
      edges{

        node {
          date
          modified
          id
          title
          excerpt
          slug
          content
          categories (first: 1){
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
        search: search,
        perPage: perPage,
        offset: offset,
      },
    }
  );
  data?.posts?.edges?.forEach(({ node }: any) => {
    normalizePost(node);
  });
  return data;
}
