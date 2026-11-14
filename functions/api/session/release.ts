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
      sessionId,
      activeQuestion,
    } = body;

    await context.env.DB.prepare(`
      UPDATE sessions
      SET active_question = ?
      WHERE id = ?
    `)
      .bind(
        activeQuestion,
        sessionId
      )
      .run();

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}