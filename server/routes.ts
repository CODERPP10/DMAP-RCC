import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import * as fs from "fs";
import * as path from "path";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import { contactSchema } from "@shared/contact";

/**
 * All API routes. The site is otherwise static — the only dynamic endpoint is
 * the contact form, which emails submissions via Gmail SMTP.
 */
export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req: Request, res: Response) => {
    let data;
    try {
      data = contactSchema.parse(req.body);
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid data provided", errors: err.errors });
      }
      throw err;
    }

    // Honeypot tripped — pretend success, send nothing.
    if (data.company) {
      return res.json({ success: true, message: "Message received." });
    }

    const { MAIL_USER, MAIL_PASS, MAIL_TO } = process.env;
    if (!MAIL_USER || !MAIL_PASS) {
      console.error("Contact form: MAIL_USER / MAIL_PASS not configured");
      return res
        .status(500)
        .json({ success: false, message: "Email is not configured on the server." });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: MAIL_USER, pass: MAIL_PASS },
      });

      await transporter.sendMail({
        from: `"DMAP Website" <${MAIL_USER}>`,
        to: MAIL_TO || MAIL_USER,
        replyTo: data.email,
        subject: `Contact form: ${data.name}`,
        text:
          `Name: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || "-"}\n\n` +
          `${data.message}\n`,
      });

      return res.json({ success: true, message: "Message sent. We'll get back to you soon." });
    } catch (err) {
      console.error("Contact form: send failed:", (err as Error).message);
      return res
        .status(502)
        .json({ success: false, message: "Could not send your message. Please try again later." });
    }
  });

  // Company brochure download (optional file).
  app.get("/brochure.pdf", (_req, res) => {
    const brochurePath = path.join(process.cwd(), "public", "brochure.pdf");
    if (fs.existsSync(brochurePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="DMAP-Construction-Brochure.pdf"');
      fs.createReadStream(brochurePath).pipe(res);
    } else {
      res.status(404).json({ success: false, message: "Brochure not available." });
    }
  });

  // Unknown API routes: 404 as JSON rather than falling through to the SPA.
  app.use("/api", (_req, res) => {
    res.status(404).json({ success: false, message: "Not found" });
  });

  return createServer(app);
}
