import { fetchAPI } from "../../api";

type typeParams= {
  postId: String | String[] | undefined;
  commentsPerPage: number;
  after: String | String[] | undefined;
}

export async function getComments ({postId, commentsPerPage, after}: typeParams) {
  const data = await fetchAPI(`
  query MyQuery($postId: ID!, $commentsPerPage: Int!, $after: String) {
    post(id: $postId) {
      commentCount
      comments(first: $commentsPerPage, after: $after) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          node {
            content
            date
                author {
                  node {
                    name
                    avatar {
                      url 
                    }
                  }
                }
                date
                id
          }
          
        }
      }
      databaseId
      id
    }
  }

  `, {
    variables : {
      postId,
      commentsPerPage,
      after
    }
  })
  return data
}