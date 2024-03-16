import { generateUniqueAlias } from "@/lib/generate-unique-alias";
import { getUser } from "@/lib/get-auth";
import type { APIRoute } from "astro";
import { db, Links, Users, eq } from "astro:db";
import { z } from "zod";
import * as naughtyWords from 'naughty-words'

const linkSchema = z.object({
  link: z.string().url(),
  public: z.enum(['on', 'off']).optional(),
  alias: z.string().optional(),
});

export const POST: APIRoute = async ({request, cookies}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const { link, public: isPublic, alias } = linkSchema.parse(data);
    const user = await getUser({ cookies: cookies });
    if (!user && isPublic === 'on') {
      return new Response('Unauthorized', { status: 401 });
    }

    let newAlias = alias;
    if (!alias) {
      const links = await db.select().from(Links);
      newAlias = generateUniqueAlias(links.map((link) => link.title));
    } else {
      Object.values(naughtyWords).forEach((dictionary) => {
        if (dictionary.includes(alias)) {
          return new Response('Invalid alias', { status: 400 });
        }
      })
    }
    if (!user) {
      await db.insert(Links).values({
        title: newAlias as string,
        url: link,
        public: false
      });
      return new Response(
        JSON.stringify({
          title: newAlias,
          public: false
        })
      );
    }
    const [{ id: userId }] = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.email ?? ''));

    await db.insert(Links).values({
      title: newAlias as string,
      url: link,
      public: isPublic === 'on',
      userId,
    });
    return new Response(
      JSON.stringify({
        title: newAlias,
        public: isPublic === 'on',
      })
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response('Invalid data', { status: 400 });
    }
    return new Response('An error ocurred', { status: 500 });
  }
}