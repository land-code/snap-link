import { Links, db, eq } from "astro:db"

export const config = {
  matcher: '/l/:path*'
}

export default async function middleware (request) {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/l/')) {
    const title = url.pathname.slice(3)
    const [{url: destination}] = await db.select().from(Links).where(eq(Links.title, title))
    if (destination) {
      return Response.redirect(destination, 301)
    }
  }
}