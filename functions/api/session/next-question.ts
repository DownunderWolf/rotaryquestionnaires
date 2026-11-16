export interface Env {
  DB: D1Database;
}

export async function onRequestPost(
  context: {
    request: Request;
    env: Env;
  }
) {
  try {
    const body =
      await context.request.json();

    const {
      sessionCode,
    } = body;

    await context.env.DB.prepare(`
      UPDATE sessions
      SET active_question =
        active_question + 1
      WHERE session_code = ?
    `)
      .bind(sessionCode)
      .run();

    return Response.json({
      success: true,
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