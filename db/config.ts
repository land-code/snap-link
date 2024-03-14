import { column, defineDb, defineTable } from 'astro:db';

export const Links = defineTable({
  columns: {
    title: column.text({ unique: true, optional: true }),
    url: column.text()
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Links
  }
});
