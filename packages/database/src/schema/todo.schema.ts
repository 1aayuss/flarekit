import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  created_at: text('created_at').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
});

export type InsertTodoType = InferInsertModel<typeof todos>;
export type SelectTodoType = InferSelectModel<typeof todos>;
