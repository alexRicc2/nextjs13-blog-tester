import { fetchAPI } from "../../api";
export async function getPosts() {
  const data = await fetchAPI(`
  query Get_POSTS{
    posts(first: 1000){
      edges{
        node{
          title
          slug
        }
      }
    }
  }`);
  return data;
}
