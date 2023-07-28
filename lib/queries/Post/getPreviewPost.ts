import { normalizePost } from "@/utils/Normalize"
import { fetchAPI } from "../../api"

export async function getPreviewPost(id: number | undefined | string | string[], idType = 'DATABASE_ID', authToken='') {
  
  // const data = {}
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      description
      avatar {
        url
      }
      slug
    }
    fragment PostFields on Post {
      title
      id
      content
      excerpt
      slug
      date
      modified
      databaseId
      
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories (first: 10){
        edges {
          node {
            name
            id
            slug
          }
        }
      }
      tags (first: 10) {
        edges {
          node {
            name
            id
            slug
          }
        }
      }
    }
    query PreviewPost($id: ID! = "${id}", $idType: PostIdType! = ${idType}) {
      post(id: $id, idType: $idType) {
        ...PostFields
      }
    }`,
    {},
    authToken
  )
  data.post = normalizePost(data?.post)
  return data
}