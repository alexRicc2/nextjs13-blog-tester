import { fetchAPI } from "../../api";
export async function getPosts() {
  const data = await fetchAPI(`
  query Get_POSTS{
    posts(first: 100){
      edges{
        node{
          title
          slug
        }
      }
    }
  }`);
  const posts2 = await fetchAPI(`
  query GetPosts2{
    posts(where: { offsetPagination: { size: 100, offset: 100 }}){
      edges{
        node{
          title
          slug
        }
      }
    }
  }`)
  // console.log('data', data.posts.edges)
  const posts = [...data.posts.edges, ...posts2.posts.edges]
  // console.log("data lenght", data.posts.edges.lenght)
  return posts;
}
