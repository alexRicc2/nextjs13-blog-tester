import { fetchAPI } from "../../api";
import { normalizePost } from "../../../utils/Normalize";

export async function getPostTest(slug: string | undefined | string[]) {
  const data = await fetchAPI(
    `query PostBySlug($id: ID!, $idType: PostIdType!){
    post(id: $id, idType: $idType){
      title
    } 
  }`,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }
  );

  return data;
}

export async function getPostAndMorePosts(
  slug: string | undefined | string[],
  preview: boolean,
  previewData: any
) {
  const postPreview = preview && previewData?.post;
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug));
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug;
  const isDraft = isSamePost && postPreview?.status === "draft";
  const isRevision = isSamePost && postPreview?.status === "publish";
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      slug
      description
      avatar(size: 180) {
        url
      }
    }
    fragment PostFields on Post {
      title
      id
      excerpt
      slug
      date
      modified
      databaseId 
      author {
        node {
          ...AuthorFields
        }
      }
      categories (first: 10){
        edges {
          node {
            name
            id
            slug
          }
        }
      }
      tags (first: 10) {
        edges {
          node {
            name
            id
            slug
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        featuredImage {
          node {
            sourceUrl(size: MEDIUM_LARGE)
            altText
          }
        }
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
          schemaDetails
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
        ${
          // Only some of the fields of a revision are considered as there are some inconsistencies
          isRevision
            ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
            : ""
        }
      }
      posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            id
            slug
            categories (first: 1){
              edges{
                node{
                  slug
                  id
                  name
                }
              }
            }

            featuredImage {
              node {
                sourceUrl(size: MEDIUM_LARGE)
                altText
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? "DATABASE_ID" : "SLUG",
      },
    }
  );

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id;
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node;

    if (revision) Object.assign(data.post, revision);
    delete data.post.revisions;
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(
    ({ node }: any) => node.slug !== slug
  );
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 3) data.posts.edges.pop();
  if (!data?.post) return {};

  data.post = normalizePost(data?.post);

  // Fetch related posts from the same category
  const categoryIn = data?.post?.categories?.edges
    ?.slice(0, 4)
    .map((edge: any) => edge.node.id);
  const relatedPosts = await fetchAPI(
    `
 query getCategory($categoryIn: [ID] = "") {
   posts(first: 6, where: { categoryIn: $categoryIn }) {
     edges {
       node {
        title
        id
        slug
        categories(first: 1) {
          edges {
            node {
              slug
              name
            }
          }
        }
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
       }
     }
   }
 }
 `,
    {
      variables: {
        categoryIn,
      },
    }
  );
  // Filter out the main post
  relatedPosts.posts.edges = relatedPosts.posts.edges.filter(
    ({ node }: any) => node.slug !== slug
  );
  data.relatedPosts = relatedPosts?.posts?.edges.map(({ node }: any) => node);

  return data;
}
