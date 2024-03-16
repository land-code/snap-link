import { db, Links, Users } from 'astro:db';

export default async function() {
  await db.insert(Users).values([
    {
      email: 'unrandom@gmail.com'
    }
  ])
  await db.insert(Links).values([
    { title: 'Example', url: 'https://example.com', userId: 1  },
    { title: 'Public example', url: 'https://public-example.com', public: true, userId: 1 }
  ])
}