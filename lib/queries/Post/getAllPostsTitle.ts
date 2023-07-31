import { fetchAPI } from "../../api";
import { normalizePost } from "../../../utils/Normalize";

export async function getAllPost(slug: string | undefined | string[]) {
  const data = await fetchAPI(
    `query PostBySlug($id: ID!, $idType: PostIdType!){
    post(id: $id, idType: $idType){
      title
      slug
    } 
  }`,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }
  );

  return data;
}
