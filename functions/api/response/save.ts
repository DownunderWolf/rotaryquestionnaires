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
      questionId,
      responseText,
    } = body;

    const result =
      await context.env.DB.prepare(`
        INSERT INTO responses
        (
          session_id,
          question_id,
          response_text
        )
        VALUES (?, ?, ?)
      `)
        .bind(
          sessionId,
          questionId,
          responseText
        )
        .run();

    return Response.json({
      success: true,
      responseId:
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