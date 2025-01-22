import { createExecutionContext, env } from 'cloudflare:test';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { initDBInstance, getInstance } from '../../src';
import { todos } from '@schema/todo.schema';

const ctx = createExecutionContext();
const db = initDBInstance(ctx, env);

describe('todo.service', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('getTodoRecord', () => {
    it('should return all todos successfully', async () => {
      const testTodo = {
        title: 'Test Todo',
        description: 'Test Description',
        created_at: new Date().toISOString(),
      };

      await db.todo.createTodoRecord(testTodo);
      const result = await db.todo.getTodoRecord();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((todo) => todo.title === testTodo.title)).toBe(true);
    });

    it('should throw an error when database query fails', async () => {
      const instance = getInstance(ctx);
      if (!instance) throw new Error('Ctx instance not found');

      vi.spyOn(instance.db, 'select').mockImplementation(() => {
        throw new Error('DB Select Failed');
      });

      await expect(db.todo.getTodoRecord()).rejects.toThrow(
        'Could not fetch todos',
      );
    });
  });

  describe('createTodoRecord', () => {
    it('should create a new todo and return its id', async () => {
      const newTodo = {
        title: 'New Todo',
        description: 'Test Description',
        created_at: new Date().toISOString(),
      };

      const id = await db.todo.createTodoRecord(newTodo);
      expect(typeof id).toBe('number');

      const todos = await db.todo.getTodoRecord();
      const createdTodo = todos.find((t) => t.id === id);
      expect(createdTodo).toBeDefined();
      expect(createdTodo?.title).toBe(newTodo.title);
      expect(createdTodo?.completed).toBe(false);
    });

    it('should create a todo with specified completion status', async () => {
      const newTodo = {
        title: 'Completed Todo',
        description: 'Test Description',
        created_at: new Date().toISOString(),
        completed: true,
      };

      const id = await db.todo.createTodoRecord(newTodo);
      const todos = await db.todo.getTodoRecord();
      const createdTodo = todos.find((t) => t.id === id);
      expect(createdTodo?.completed).toBe(true);
    });

    it('should throw an error when creation fails', async () => {
      const instance = getInstance(ctx);
      if (!instance) throw new Error('Ctx instance not found');

      vi.spyOn(instance.db, 'insert').mockImplementation(() => {
        throw new Error('DB Insert Failed');
      });

      const newTodo = {
        title: 'Failed Todo',
        description: 'Should Fail',
        created_at: new Date().toISOString(),
      };

      await expect(db.todo.createTodoRecord(newTodo)).rejects.toThrow(
        'Could not create todo',
      );
    });
  });

  describe('updateTodoRecord', () => {
    it('should update todo and return updated record', async () => {
      const initialTodo = {
        title: 'Initial Title',
        description: 'Initial Description',
        created_at: new Date().toISOString(),
      };

      const id = await db.todo.createTodoRecord(initialTodo);

      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updatedTodo = await db.todo.updateTodoRecord(id, updateData);

      expect(updatedTodo).toBeDefined();
      expect(updatedTodo?.title).toBe(updateData.title);
      expect(updatedTodo?.description).toBe(updateData.description);
    });

    it('should handle non-existent todo update gracefully', async () => {
      const updateData = {
        title: 'Updated Title',
      };

      const result = await db.todo.updateTodoRecord(99999, updateData);
      expect(result).toBeUndefined();
    });

    it('should throw an error when update fails', async () => {
      const instance = getInstance(ctx);
      if (!instance) throw new Error('Ctx instance not found');

      vi.spyOn(instance.db, 'update').mockImplementation(() => {
        throw new Error('DB Update Failed');
      });

      await expect(
        db.todo.updateTodoRecord(1, { title: 'Test' }),
      ).rejects.toThrow('Could not update todo');
    });
  });

  describe('toggleTodoRecord', () => {
    it('should toggle todo completion status', async () => {
      const todo = {
        title: 'Toggle Test',
        description: 'Test Description',
        created_at: new Date().toISOString(),
        completed: false,
      };

      const id = await db.todo.createTodoRecord(todo);

      // First toggle (false -> true)
      const firstToggle = await db.todo.toggleTodoRecord(id);
      expect(firstToggle?.completed).toBe(true);

      // Second toggle (true -> false)
      const secondToggle = await db.todo.toggleTodoRecord(id);
      expect(secondToggle?.completed).toBe(false);
    });

    it('should return undefined for non-existent todo', async () => {
      const result = await db.todo.toggleTodoRecord(99999);
      expect(result).toBeUndefined();
    });

    it('should throw error when toggle operation fails', async () => {
      const instance = getInstance(ctx);
      if (!instance) throw new Error('Ctx instance not found');

      vi.spyOn(instance.db, 'select').mockImplementation(() => {
        throw new Error('DB Select Failed');
      });

      await expect(db.todo.toggleTodoRecord(1)).rejects.toThrow(
        'Could not toggle completion status',
      );
    });

    it('should handle database update error during toggle', async () => {
      const todo = {
        title: 'Toggle Error Test',
        description: 'Test Description',
        created_at: new Date().toISOString(),
      };

      const id = await db.todo.createTodoRecord(todo);

      const instance = getInstance(ctx);
      if (!instance) throw new Error('Ctx instance not found');

      // Allow select to work but make update fail
      vi.spyOn(instance.db, 'update').mockImplementation(() => {
        throw new Error('DB Update Failed');
      });

      await expect(db.todo.toggleTodoRecord(id)).rejects.toThrow(
        'Could not toggle completion status',
      );
    });
  });
});
