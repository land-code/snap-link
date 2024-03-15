import { app } from '@/firebase/server';
import type { AstroCookies } from 'astro';
import { getAuth } from 'firebase-admin/auth';

const auth = getAuth(app);

export const checkAuth = async ({ cookies }: { cookies: AstroCookies }): Promise<boolean> => {
  if (!cookies.has('session')) {
    return false;
  }

  const sessionCookie = cookies.get('session')?.value || '';
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);

  if (!user) {
    return false;
  }
  return true;
};