import { extractReadingTime } from "./extractReadingTime";

export function normalizePost(post: any) {
  if(!post) return null

  const str = post.content ? post.content : post.excerpt
  const ReadingTime = extractReadingTime(str)
  post.readingTime = ReadingTime;

  const strTime = '<span class=\"rt-label rt-postfix\">minutes</span></span>\n'
  if(post.content && post.content?.includes(strTime)){
    post.content = post.content.split(strTime)[1] || ''
  }
  
  return post;
}
