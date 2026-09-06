/** Any unmatched /api/* path → JSON 404 (never fall through to the SPA shell). */
export const onRequest: PagesFunction = async () =>
  new Response(JSON.stringify({ success: false, message: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
