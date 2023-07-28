import { fetchAPI } from "../../api";

export async function getPages (){

  const data = await fetchAPI(`
  query getPages {
    pages(first: 100) {
      edges {
        page: node {
          slug
        }
      }
    }
  }
  `)
  return data?.pages?.edges ?? []
}