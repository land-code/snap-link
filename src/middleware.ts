import { Links, db, eq } from "astro:db";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({request, redirect}, next) => {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/l/')) return next()

  const linkTitle = decodeURI(url.pathname.slice(3))
  const [link] = await db.select().from(Links).where(eq(Links.title, linkTitle))
  if (!link) return next()
  const {url: destination} = link
  console.log(`Redirecting to ${destination}`)
  return redirect(destination)
})