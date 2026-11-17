export interface Env {
  DB: D1Database;
}

export async function onRequest() {
  return Response.json({
    success: true,
    message: "JOIN ENDPOINT REACHED"
  });
}
  try {
    const body =
      await context.request.json();

    await context.env.DB.prepare(`
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