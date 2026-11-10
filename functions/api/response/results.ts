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
    const results =
      await context.env.DB.prepare(`
        SELECT
          response_text,
          COUNT(*) AS total
        FROM responses
        GROUP BY response_text
        ORDER BY total DESC
      `).all();

    return Response.json({
      success: true,
      results:
        results.results || [],
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