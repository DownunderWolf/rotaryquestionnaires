export interface Env {
  DB: D1Database;
}

export async function onRequestGet(
  context: {
    request: Request;
    env: Env;
    params: {
      code: string;
    };
  }
) {
  try {

    const sessionCode =
      context.params.code;

    const session =
      await context.env.DB.prepare(`
        SELECT
          s.id,
          s.session_code,
          s.template_id,
          t.template_name
        FROM sessions s
        INNER JOIN templates t
          ON s.template_id = t.id
        WHERE s.session_code = ?
      `)
        .bind(sessionCode)
        .first();

    const questionsResult =
  await context.env.DB.prepare(`
    SELECT
      id,
      question_text,
      question_type,
      display_order
    FROM questions
    WHERE template_id = ?
    ORDER BY display_order
  `)
    .bind(session?.template_id)
    .all();

return Response.json({
  success: true,
  session,
  questions:
    questionsResult.results || [],
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