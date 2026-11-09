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
    const { results } =
      await context.env.DB.prepare(`
        SELECT
          id,
          template_name,
          description,
          created_date,
          modified_date,
          status
        FROM templates
        WHERE status = 'ACTIVE'
        ORDER BY modified_date DESC
      `).all();

    return Response.json({
      success: true,
      templates: results,
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
      templateName,
      description,
      questions,
    } = body;

    const templateInsert =
      await context.env.DB.prepare(
        `
        INSERT INTO templates
        (
          template_name,
          description
        )
        VALUES (?, ?)
      `
      )
        .bind(
          templateName,
          description
        )
        .run();

    const templateId =
      templateInsert.meta.last_row_id;

    for (
      let i = 0;
      i < questions.length;
      i++
    ) {
      const question =
        questions[i];

      await context.env.DB.prepare(
        `
        INSERT INTO questions
        (
          template_id,
          question_text,
          question_type,
          display_order
        )
        VALUES (?, ?, ?, ?)
      `
      )
        .bind(
          templateId,
          question.text,
          question.type,
          i + 1
        )
        .run();
    }

    return Response.json({
      success: true,
      templateId,
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
      { status: 500 }
    );
  }
}