import { column, defineDb, defineTable } from 'astro:db';

export const Links = defineTable({
  columns: {
    title: column.text({ unique: true }),
    url: column.text(),
    public: column.boolean({ default: false }),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Links
  }
});
