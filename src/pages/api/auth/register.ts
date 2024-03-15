import { app } from "@/firebase/server";
import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app)

  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return new Response(
      'Missing form fields',
      { status: 400 }
    )
  }

  try {
    await auth.createUser({
      email,
      password
    })
  } catch (error) {
    return new Response(
      'Something went wrong',
      { status: 400 }
    )
  }

  return redirect('/login')
}