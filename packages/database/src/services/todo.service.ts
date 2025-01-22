import { eq } from 'drizzle-orm';
import { InsertTodoType, SelectTodoType, todos } from '@schema/todo.schema';
import { Ctx } from '../types';

// Fetch all todos
export const getTodoRecord = async (ctx: Ctx) => {
  try {
    return await ctx.db.select().from(todos).all();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Could not fetch todos');
  }
};

// Create a new todo
export const createTodoRecord = async (
  data: {
    title: string;
    description: string;
    created_at: string;
    completed?: boolean;
  },
  ctx: Ctx,
): Promise<number> => {
  try {
    const result = await ctx.db
      .insert(todos)
      .values({
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        completed: data.completed ?? false,
      })
      .returning()
      .get();

    // console.log("Created todo:", result);
    return result.id;
  } catch (error) {
    console.error('Failed to create todo:', error);
    throw new Error('Could not create todo');
  }
};

// Update an existing todo
//! Something is wrong here
export const updateTodoRecord = async (
  id: number,
  data: Partial<InsertTodoType>,
  ctx: Ctx,
): Promise<SelectTodoType | undefined> => {
  try {
    const updatedTodo = await ctx.db
      .update(todos)
      .set(data)
      .where(eq(todos.id, id))
      .returning()
      .get();

    if (!updatedTodo) {
      console.warn('Todo not found for update:', id);
    } else {
      // console.log("Updated todo:", updatedTodo);
    }
    return updatedTodo;
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw new Error('Could not update todo');
  }
};

// Toggle the completion status of a todo
export const toggleTodoRecord = async (
  id: number,
  ctx: Ctx,
): Promise<SelectTodoType | undefined> => {
  try {
    const todo = await ctx.db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .get();

    if (!todo) {
      console.warn('Todo not found for toggleComplete:', id);
      return undefined;
    }

    const updatedTodo = await ctx.db
      .update(todos)
      .set({ completed: !todo.completed })
      .where(eq(todos.id, id))
      .returning()
      .get();

    // console.log("Toggled completion status for todo:", updatedTodo);
    return updatedTodo;
  } catch (error) {
    console.error('Failed to toggle completion status:', error);
    throw new Error('Could not toggle completion status');
  }
};
