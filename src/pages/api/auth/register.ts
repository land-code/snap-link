import { app } from "@/firebase/server";
import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";

type ServerAuthError = {
  errorInfo: {
    code: string
    message: string
  }
  codePrefix: string
}

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
    const authError = error as ServerAuthError
    return new Response(authError.errorInfo.message, { status: 400 })
  }

  return redirect('/login')
}