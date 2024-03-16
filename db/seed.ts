import { db, Links, Users } from 'astro:db';

export default async function() {
  await db.insert(Users).values([
    {
      id: 1,
      email: 'davidgrcdiaz@gmail.com'
    }
  ])
  await db.insert(Links).values([
    { title: 'Example', url: 'https://example.com'  },
    { title: 'Public example', url: 'https://public-example.com', public: true, userId: 1 }
  ])
}