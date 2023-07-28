import { calculateReadingTime } from "../../../utils/calculateReadingTime";
import { fetchAPI } from "../../api";

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query NewQuery($id: ID!, $idType: PostIdType!) {
      posts(id: $id,idType: $idType) {
        edges {
          node {
            id
            title
            content
          }
        }
      }
    }
    `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }
  );
  data?.posts?.edges?.forEach(({ node }: any) => {
    const ReadingTime = calculateReadingTime(node?.content);
    node.readingTime = ReadingTime;
  });
  return data;
}
