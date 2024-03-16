import { app } from "@/firebase/server";
import type { APIRoute } from "astro";
import { Users, db } from "astro:db";
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
    await db.insert(Users).values({
      email
    })
  } catch (error) {
    const databaseError = error as {code: string}
    if (databaseError.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return new Response('Email already in use', { status: 400 })
    }
    const authError = error as ServerAuthError
    if (authError.errorInfo.code) {
      return new Response(authError.errorInfo.message, { status: 400 })
    }
    console.error(error)
    return new Response('Error creating user', { status: 500 })
  }

  return redirect('/login')
}