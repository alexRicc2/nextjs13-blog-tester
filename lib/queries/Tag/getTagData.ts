import { fetchAPI } from "../../api";

export async function getTagData(name: string | undefined | string[]) {
  const data = fetchAPI(
    `
  query NewQuery($id: ID!) {
    tag(id: $id, idType: SLUG) {
      count
      name
      slug
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
