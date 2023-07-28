import cookie from "cookie"
import type { NextApiRequest } from 'next'

export function parseCookies(req: NextApiRequest){
  return cookie.parse(req? req.headers.cookie || "":document.cookie)
}
export function getAuthToken(req: NextApiRequest){
  const cookies = parseCookies(req)
  return cookies['auth'] || ''
}