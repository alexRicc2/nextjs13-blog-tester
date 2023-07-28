import { fetchAPI } from "../../api";

export async function getCategoryWithMostPosts(quantity: number = 100) {

  const data = await fetchAPI(`
  query NewQuery {
    categories(first: ${quantity}) {
      edges {
        category: node {
          slug
          name
          posts {
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      }
    }
  }
  `);
  const categories = data?.categories?.edges ?? [];
  categories.sort((a: any, b: any) => b.category.posts.pageInfo.offsetPagination.total - a.category.posts.pageInfo.offsetPagination.total);
  const categoryWithMostPosts = categories
  return categoryWithMostPosts;
}
