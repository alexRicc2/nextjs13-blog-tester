import { fetchAPI } from "../../api"
export async function getPostTest(slug: string | undefined | string[]){
  const data = await fetchAPI(`query PostBySlug($id: ID!, $idType: PostIdType!){
    post(id: $id, idType: $idType){
      title
    } 
  }`,
  {
    variables: {
      id: slug,
      idType: "SLUG",
    },
  })

  console.log('data na api back', data)
  return data
}

