import { fetchAPI } from "../../api";

export async function getAllCategoriesName(quantity: number = 100) {

  const data = await fetchAPI(`
  query NewQuery {
    categories(first: ${quantity}) {
      edges {
        category: node {
          slug
          name
          id
          count
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
  const filteredCategories = categories.filter(
    ({ category }: any) => category.posts.pageInfo.offsetPagination.total >= 1
  );
  return filteredCategories;
}
