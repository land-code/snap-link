import { db, Links } from 'astro:db';

export default async function() {
  await db.insert(Links).values([
    { title: 'Example', url: 'https://example.com' },
    { title: 'Public example', url: 'https://public-example.com', public: true }
  ])
}