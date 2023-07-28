import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { isEmpty} from 'lodash';
const API_URL =
  `${process.env.WORDPRESS_API_URL}/graphql` ;
export async function fetchAPI(
  query = "",
  { variables }: Record<string, any> = {},
  authToken = ""
) {
  const headers: HeadersInit = { "Content-Type": "application/json" };

  //if has authToken it will add the token to the post header, used to get post previews for example
  if (!isEmpty(authToken)) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }
  console.log('bodyyy pro postman',{
    query, variables
  })
  //WPGraphql Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
  
}
const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostTest(slug: string | undefined | string[]){
  const data = await fetchAPI(`query PostBySlug($id: ID!, $idType: PostIdType!){
    post(id: $id, idType: $idType){
      title
    } 
  }`,
  {
    variables: {
      id: slug,
      idType: "SLUG",
    },
  })

  console.log('data na api back', data)
  return data
}


export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}
export async function getPosts(){
  const data = await fetchAPI(`
  query Get_POSTS{
    posts(first: 1000){
      edges{
        node{
          title
          slug
        }
      }
    }
  }`)
  return data
}
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
