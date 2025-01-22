import type { APIRoute } from 'astro';

export const prerender = false;

// Create
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const dbInstance = locals.runtime.env.DB;
    if (!dbInstance) {
      throw new Error('You need to add DB binding to the environment.');
    }
    const body: { title: string; description: string } = await request.json();
    const { title, description } = body;

    if (!title || !description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
        },
      );
    }

    const result = await locals.DB.todo.createTodoRecord({
      title: title,
      description: description,
      created_at: new Date().toISOString(),
      completed: false,
    });

    return new Response(
      JSON.stringify({
        success: true,
        id: result,
        title: title,
        description: description,
        createdAt: new Date().toISOString(),
        completed: false,
      }),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};

export const GET: APIRoute = async ({ locals }) => {
  try {
    const dbInstance = locals.runtime.env.DB;
    if (!dbInstance) {
      throw new Error('You need to add storage binding to the environment.');
    }
    const todos = await locals.DB.todo.getTodoRecord();
    return new Response(JSON.stringify({ todos }), {
      status: 200,
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};
