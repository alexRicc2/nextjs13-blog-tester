import { fetchAPI } from "../../api";

export async function getTest (){

  const data = await fetchAPI(`
  query getPageData {
    pages(first: 10) {
      edges{
        node{
          id
          uri
          title
          guid
        }
      }
    }
  }
  `)
  // console.log('pages: ', data)
  // data.pages.edges.forEach((page: any) => {
  //   console.log('page: ', page)
  // });
  return data?.pages ?? []
}