export interface Env {
  DB: D1Database;
}

export async function onRequestGet(
  context: {
    request: Request;
    env: Env;
    params: {
      id: string;
    };
  }
) {
  try {
    const templateId = Number(
      context.params.id
    );

    const template =
      await context.env.DB.prepare(
        `
        SELECT
          id,
          template_name,
          description,
          created_date,
          modified_date,
          status
        FROM templates
        WHERE id = ?
      `
      )
        .bind(templateId)
        .first();

    if (!template) {
      return Response.json(
        {
          success: false,
          error:
            "Template not found",
        },
        {
          status: 404,
        }
      );
    }

    const questionsResult =
      await context.env.DB.prepare(
        `
        SELECT
          id,
          template_id,
          question_text,
          question_type,
          display_order
        FROM questions
        WHERE template_id = ?
        ORDER BY display_order
      `
      )
        .bind(templateId)
        .all();

    const questions =
      questionsResult.results || [];

    const questionsWithOptions =
      await Promise.all(
        questions.map(
          async (question: any) => {
            const optionsResult =
              await context.env.DB.prepare(
                `
                SELECT
                  option_text
                FROM question_options
                WHERE question_id = ?
                ORDER BY display_order
              `
              )
                .bind(question.id)
                .all();

            return {
              ...question,
              options:
                optionsResult.results?.map(
                  (option: any) =>
                    option.option_text
                ) || [],
            };
          }
        )
      );

    return Response.json({
      success: true,
      template,
      questions:
        questionsWithOptions,
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