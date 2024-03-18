import type {RequestContext} from '@vercel/edge'
import { Links, db, eq } from 'astro:db'

export default async function ({request, context}: {request: Request, context: RequestContext}) {
  const url = new URL(request.url)
  const urlTitle = url.pathname.slice(3)
  console.log(urlTitle)
  const [{url: destination}] = await db.select().from(Links).where(eq(Links.title, urlTitle))
  return {
    destination
  }
}