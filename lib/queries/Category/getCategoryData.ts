import { fetchAPI } from "../../api";

export async function getCategoryData(name: string | undefined | string[]) {
  const data = fetchAPI(
    `
  query NewQuery($id: ID!) {
    category(id: $id, idType: SLUG) {
      count
      name
      slug
      description
      seo {
        breadcrumbs {
          text
          url
        }
        title
        metaDesc
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphAuthor
        opengraphDescription
        opengraphType
        opengraphTitle
        opengraphImage {
          sourceUrl
        }
        opengraphSiteName
        opengraphPublishedTime
        opengraphModifiedTime
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
    }
  }
  `,
    {
      variables: {
        id: name,
      },
    }
  );
  return data;
}
