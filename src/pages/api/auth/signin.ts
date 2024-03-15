import type { APIRoute } from "astro";
import { app } from "@/firebase/server";
import { getAuth } from "firebase-admin/auth";

export const GET: APIRoute = async ({request, cookies, redirect}) => {
  const auth = getAuth(app)

  const idToken = request.headers.get("Authorization")?.replace("Bearer ", "")
  if (!idToken) {
    return new Response('Token not found', { status: 400 })
  }

  try {
    await auth.verifyIdToken(idToken)
  } catch (error) {
    return new Response('Token inválido', { status: 401 })
  }

  const fiveDays = 60 * 60 * 24 * 5
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays
  })

  cookies.set('session', sessionCookie, {
    path: '/'
  })

  return redirect('/')
}