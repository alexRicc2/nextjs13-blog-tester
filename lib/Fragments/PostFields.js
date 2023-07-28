export const PostFields = /* GraphQL */`
  fragment PostFields on Post {
      date
      modified
      id
      title
      excerpt
      slug
      categories {
        edges {
          node {
            name
            slug
          }
        }
      }
      author {
        node {
          avatar {
            url
          }
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl(size: MEDIUM_LARGE)
          altText
        }
      }
    }
`