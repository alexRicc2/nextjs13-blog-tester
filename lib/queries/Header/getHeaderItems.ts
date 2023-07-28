import { fetchAPI } from "../../api";

export async function getHeaderItems() {
  const data = await fetchAPI(`
  query getHeaderItems {
    menu(id: "header", idType: NAME) {
      menuItems(first: 10) {
        edges {
          node {
            url
            uri
            path
            label
            id
            parentId
            childItems(first: 10) {
              edges {
                nodechild: node {
                  uri
                  id
                  label
                }
              }
            }
          }
        }
      }
    }
    getHeader {
      siteLogoUrl
    }
  }`);

  //filter out repeated subitems from menu
  if (data?.menu) {
    data.menu.menuItems.edges =
      data?.menu?.menuItems?.edges?.filter(
        ({ node }: any) => !node?.parentId
      ) ?? [];
  }

  //some link could have /index.php/yyyy/mm/dd/ as prefix, we remove these prefix with REGEX
  const regex = /\/index\.php\/(?:\d{4}\/\d{2}\/\d{2}\/)?(.+)/;
  const newResponse = JSON.parse(JSON.stringify(data), (key, value) => {
    if (key === "uri") {
      return value.replace(regex, "$1");
    }
    return value;
  });

  return newResponse ?? {};
}
