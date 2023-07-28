import { normalizePost } from "@/utils/Normalize";
import { fetchAPI } from "../../api";

type Params ={
  categoryName: string | undefined | string[];
  offset: null | number;
  perPage: number;
}

export async function getAllPostsByCategory({categoryName, offset, perPage}: Params){
  const data = await fetchAPI(`
  query NewQuery($categoryName: String, $offset: Int, $perPage: Int) {
    posts(where: {categoryName: $categoryName , offsetPagination: {offset: $offset, size: $perPage}} ) {
      edges{
        node {
          date
          modified
          id
          title
          excerpt
          slug
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
  `,{
    variables: {
      categoryName: categoryName,
      offset,
      perPage,

    }
  })
  const posts = data?.posts?.edges?.map(({node}: any)=> {return {node: normalizePost(node)}})
  data.posts.edges = posts
  return data ?? {} 
}