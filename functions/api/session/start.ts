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
      templateId,
      audienceName,
    } = body;

    const sessionCode =
      Math.random()
        .toString(36)
        .toUpperCase()
        .substring(2, 8);

    const result =
      await context.env.DB.prepare(`
        INSERT INTO sessions
        (
          template_id,
          session_code,
          audience_name,
          start_date,
          status
        )
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, 'ACTIVE')
      `)
        .bind(
          templateId,
          sessionCode,
          audienceName || "Workshop"
        )
        .run();

    return Response.json({
      success: true,
      sessionId:
        result.meta.last_row_id,
      sessionCode,
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
