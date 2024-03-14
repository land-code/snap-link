import { db, Links } from 'astro:db';

export default async function() {
  await db.insert(Links).values([
    { title: 'Example', url: 'https://example.com' }
  ])
}