import { ZodError } from "zod";
// Relative import, not the "@shared" alias: Pages Functions are bundled by
// wrangler/esbuild, which does not read vite.config.ts path aliases.
import { contactSchema } from "../../shared/contact";

interface Env {
  RESEND_API_KEY: string;
  MAIL_FROM: string;
  MAIL_TO: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * POST /api/contact — the site's only dynamic endpoint. Validates the shared
 * contact contract and emails the submission via the Resend HTTP API.
 */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data;
  try {
    data = contactSchema.parse(await request.json());
  } catch (err) {
    if (err instanceof ZodError) {
      return json(
        { success: false, message: "Invalid data provided", errors: err.errors },
        400,
      );
    }
    return json({ success: false, message: "Invalid request body" }, 400);
  }

  // Honeypot tripped — pretend success, send nothing.
  if (data.company) {
    return json({ success: true, message: "Message received." });
  }

  if (!env.RESEND_API_KEY) {
    console.error("Contact form: RESEND_API_KEY not configured");
    return json(
      { success: false, message: "Email is not configured on the server." },
      500,
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        reply_to: data.email,
        subject: `Contact form: ${data.name}`,
        text:
          `Name: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || "-"}\n\n` +
          `${data.message}\n`,
      }),
    });

    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text());
      return json(
        { success: false, message: "Could not send your message. Please try again later." },
        502,
      );
    }

    return json({ success: true, message: "Message sent. We'll get back to you soon." });
  } catch (err) {
    console.error("Contact form: send failed:", (err as Error).message);
    return json(
      { success: false, message: "Could not send your message. Please try again later." },
      502,
    );
  }
};
