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
    const body = await context.request.json();

    const result = await context.env.DB.prepare(`
      INSERT INTO session_participants
      (
        session_id
      )
      VALUES (?)
    `)
      .bind(body.sessionId)
      .run();

    return Response.json({
  success: true,
  participantId:
    result.meta.last_row_id,
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