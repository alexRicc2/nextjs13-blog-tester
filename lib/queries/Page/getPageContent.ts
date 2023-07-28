import { fetchAPI } from "../../api";
import { PostFields } from "../../Fragments/PostFields";
import { normalizePost } from "../../../utils/Normalize";
export async function getPageContent() {
  const data = await fetchAPI(/* GraphQL */ `
    ${PostFields}
    query getPageData {
      page(id: "/", idType: URI) {
        title
        pageContent {
          announcementBar
          section1 {
            postsSelect {
              postsOptions
              selectPosts {
                ... on Post {
                  ...PostFields
                }
              }
              category {
                slug
                name
                posts(first: 4) {
                  nodes {
                    ...PostFields
                  }
                }
              }
            }
          }
          section2 {
            sectionTitle
            postsSelect {
              postsOptions
              selectPosts {
                ... on Post {
                  ...PostFields
                }
              }
              category {
                slug
                name
                posts(first: 4) {
                  nodes {
                    ...PostFields
                  }
                }
              }
            }
          }
          section3 {
            sectionTitle
            postsSelect {
              postsOptions
              selectPosts {
                ... on Post {
                  ...PostFields
                }
              }
              category {
                slug
                name
                posts(first: 4) {
                  nodes {
                    ...PostFields
                  }
                }
              }
            }
          }
          section4 {
            sectionTitle
            postsSelect {
              postsOptions
              selectPosts {
                ... on Post {
                  ...PostFields
                }
              }
              category {
                slug
                name
                posts(first: 4) {
                  nodes {
                    ...PostFields
                  }
                }
              }
            }
          }
          section5 {
            sectionTitle
            postsSelect {
              postsOptions
              selectPosts {
                ... on Post {
                  ...PostFields
                }
              }
              category {
                slug
                name
                posts(first: 4) {
                  nodes {
                    ...PostFields
                  }
                }
              }
            }
          }
          section6 {
            category1 {
              slug
              name
              posts(first: 3) {
                nodes {
                  ...PostFields
                }
              }
            }
            category2 {
              slug
              name
              posts(first: 3) {
                nodes {
                  ...PostFields
                }
              }
            }
            category3 {
              slug
              name
              posts(first: 4) {
                nodes {
                  ...PostFields
                }
              }
            }
          }
        }
      }
    }
  `);

  const LastPublishedData = await fetchAPI(/* GraphQL */ `
    ${PostFields}
    query LastPublished {
      posts(first: 8) {
        nodes {
          ...PostFields
        }
      }
    }
  `);
  const LastUpdatedsData = await fetchAPI(/* GraphQL */ `
    ${PostFields}
    query LastPublished {
      posts(first: 5, where: { orderby: { field: MODIFIED, order: DESC } }) {
        nodes {
          ...PostFields
        }
      }
    }
  `);
  const LastPublished = LastPublishedData.posts.nodes;
  const LastUpdateds = LastUpdatedsData.posts.nodes;
  const pageContent = data?.page?.pageContent;

  const getSelectedPosts = (sectionData: any) => {
    const postsSelect = sectionData.postsSelect;
    const postsOption = postsSelect.postsOptions;

    const sectionToReturn = {
      posts: [],
      title: sectionData?.sectionTitle || "",
      link: "",
    };

    switch (postsOption) {
      case "category":
        sectionToReturn.posts = postsSelect.category.posts.nodes;
        sectionToReturn.link = `/category/${postsSelect.category.slug}`;
        sectionToReturn.title = postsSelect.category.name;
        break;
      case "custom":
        sectionToReturn.posts = postsSelect.selectPosts;
        break;
      case "last_published":
        sectionToReturn.posts = LastPublished.slice(0, 4);
        sectionToReturn.link = "/page/2";
        break;
      case "next_last_published":
        sectionToReturn.posts = LastPublished.slice(4, 8);
        sectionToReturn.link = "/page/2";
        break;
      case "last_updated":
        sectionToReturn.posts = LastUpdateds;
        break;
      default:
        break;
    }

    sectionToReturn.posts.map((post: any) => normalizePost(post));
    return sectionToReturn;
  };

  const section6data = pageContent.section6;

  const section1 = getSelectedPosts(pageContent.section1);
  const section2 = getSelectedPosts(pageContent.section2);
  const section3 = getSelectedPosts(pageContent.section3);
  const section4 = getSelectedPosts(pageContent.section4);
  const section5 = getSelectedPosts(pageContent.section5);
  const section6 = [
    section6data?.category1,
    section6data?.category2,
    section6data?.category3,
  ];
  const pageContentData = {
    section1,
    section2,
    section3,
    section4,
    section5,
    section6,
    announcementBar: pageContent.announcementBar,
  };

  return pageContentData ?? {};
}
