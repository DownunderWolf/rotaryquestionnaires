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

    const { templateId } = body;

    await context.env.DB.prepare(`
      DELETE FROM templates
      WHERE id = ?
    `)
      .bind(templateId)
      .run();

      console.log(
  "DELETE TEMPLATE ID",
  templateId
);

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