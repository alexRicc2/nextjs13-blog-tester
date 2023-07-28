import { fetchAPI } from "../../api"

export async function GET_HOME_PAGE(){
  const data = await fetchAPI(
    `
    query HomePageQuery {
      page(id: "/", idType: URI) {
        uri
        seo{
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
  if(data?.page?.seo?.opengraphDescription.includes('['))
    data.page.seo.opengraphDescription = "ULTATEL BLOG Homepage"
  return data?.page
}
