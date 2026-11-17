export async function onRequest() {
  return Response.json({
    success: true,
    route: "test"
  });
}