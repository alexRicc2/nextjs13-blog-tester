import { fetchAPI } from "../../api";

export async function getAllTagsName(){
  const data = await fetchAPI(`
  query NewQuery {
    tags(first: 100) {
      edges {
        tag: node {
          slug
          name
          id
          count
        }
      }
    }
  }
  `)
  const tags = data?.tags?.edges ?? []
  const filteredTags = tags.filter(({tag}: any) => tag?.count >= 1)
  
  return filteredTags;
}