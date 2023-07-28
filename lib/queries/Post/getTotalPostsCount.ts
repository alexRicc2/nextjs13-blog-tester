import { fetchAPI } from "../../api"

export async function getTotalPostsCount() {
  const data = await fetchAPI(
    `
  query GET_TOTAL_POSTS_COUNT {
  postsCount: posts {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`
  )
  return data
}

export async function getTotalPostsCountByCategory(categoryName: string | undefined | string[]) {
  const data = await fetchAPI(
    `
  query GET_TOTAL_POSTS_COUNT_BY_CATEGORY($categoryName: String) {
  postsCount: posts(where: {categoryName: $categoryName } ) {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`,{
  variables:{
    categoryName
  }
}
  )
  return data
}
export async function getTotalPostsCountByTag(tagName: string | undefined | string[]) {
  const data = await fetchAPI(
    `
  query GET_TOTAL_POSTS_COUNT_BY_CATEGORY($tagName: String) {
  postsCount: posts(where: {tag: $tagName } ) {
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`,{
  variables:{
    tagName
  }
}
  )
  return data
}