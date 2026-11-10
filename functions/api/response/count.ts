export interface Env {
  DB: D1Database;
}

export async function onRequestGet(
  context: {
    request: Request;
    env: Env;
  }
) {
  try {
    const result =
      await context.env.DB.prepare(`
        SELECT COUNT(*) AS total
        FROM responses
      `).first();

    return Response.json({
      success: true,
      count: result?.total || 0,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}