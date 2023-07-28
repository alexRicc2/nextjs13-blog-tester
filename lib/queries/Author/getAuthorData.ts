import { normalizePost } from "../../../utils/Normalize";
import { fetchAPI } from "../../api";

export async function getAuthorData(id: string | string[] | undefined = "") {
  const data = await fetchAPI(`
  query MyQuery($id: ID = "${id}") {
    user(id: $id, idType: SLUG) {
      id
      firstName
      name
      description
      email
      seo {
        title
        opengraphDescription
      }
      avatar{
        url
      }
      posts(first: 100) {
        pageInfo {
          offsetPagination {
            total
          }
        }
        edges {
          node {
            date
          modified
          id
          title
          excerpt
          slug
          categories (first: 1){
            edges{
              node{
                name
              }
            }
          }
          
          featuredImage{
            node{
              sourceUrl
              altText
            }
          }
          }
        }
      }
    }
  }
  `);
  
  return data ?? {};
}
