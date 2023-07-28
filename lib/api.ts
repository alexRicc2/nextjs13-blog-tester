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
