import { fetchAPI } from "../../api";

export async function getAllAuthorsSlug(){
  const data = await fetchAPI(`
  query MyQuery {
    users(first: 100) {
      edges {
        author: node {
          slug
        }
      }
    }
  }
  `)
  return data?.users?.edges ?? []
}