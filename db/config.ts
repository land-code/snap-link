import { column, defineDb, defineTable } from 'astro:db';

export const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    email: column.text({ unique: true }),
  }
})

export const Links = defineTable({
  columns: {
    title: column.text({ unique: true }),
    url: column.text(),
    public: column.boolean({ default: false }),
    userId: column.number({
      references: () => Users.columns.id
    })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    Links
  }
});
