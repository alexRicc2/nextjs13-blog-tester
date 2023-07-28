import { fetchAPI } from "../api";

type typeParams = {
  postDatabaseId: number;
  content: String | String[];
  authorEmail: String | String[];
  authorName: String | String[];
}

export async function createPostComment ({postDatabaseId, content, authorEmail, authorName}: typeParams){ 
  const data = fetchAPI(`
  mutation createCommentMutation($author: String, $authorEmail: String, $content: String, $commentOn: Int) {
    createComment(
      input: {author: $author, content: $content, authorEmail: $authorEmail, commentOn: $commentOn}
    ) {
      success
    }
  }
  `,
   {
    variables: {
      authorEmail,
      author: authorName,
      content,
      commentOn: postDatabaseId
    }
  })
  return data;
}