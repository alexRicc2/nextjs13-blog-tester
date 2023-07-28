import { fetchAPI } from "../../api";

export async function getPageData(slug: string|string[]|undefined ){
//TO-DO fetch all pages 
  const allPages = await fetchAPI(`
    query getAllPages{
      pages(first: 100){
        edges{
          node{
            slug
            uri      
          }
        }
      }
    }
  `)
  const page = allPages?.pages?.edges.find(({node}: any)=> node?.slug === slug)
  const data = await fetchAPI(
    `
    query getPageData($id: ID = "${page?.node?.uri}") {
      page(id: $id, idType: URI) {
        slug
        title
        content
        seo {
          breadcrumbs {
            text
            url
          }
          title
          metaDesc
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphAuthor
          opengraphDescription
          opengraphTitle
          schemaDetails
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
          opengraphPublishedTime
          opengraphModifiedTime
          twitterTitle
          twitterDescription
          twitterImage {
            sourceUrl
          }
        }
      }
    }
    `
  )
  return data
}