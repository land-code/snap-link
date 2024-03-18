export const config = {
  matcher: '/l/:path*'
}

export default async function middleware (request, ...props) {
  const url = new URL(request.url)

  console.log('astro', props)
  console.log('astro', url)
  return Response.redirect('https://www.google.com', 301)

  // if (url.pathname.startsWith('/l/')) {
  //   const title = url.pathname.slice(3)
  //   const [{url: destination}] = await db.select().from(Links).where(eq(Links.title, title))
  //   if (destination) {
  //     return Response.redirect(destination, 301)
  //   }
  // }
}