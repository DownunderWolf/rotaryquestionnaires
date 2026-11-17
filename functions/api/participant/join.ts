export async function onRequest() {
  return Response.json({
    success: true,
    message: "JOIN ENDPOINT REACHED"
  });
}