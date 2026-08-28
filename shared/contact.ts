import { z } from "zod";

/** Shared contact-form contract used by the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().max(30).optional().or(z.literal("")),
  message: z.string().min(10, { message: "Message should be at least 10 characters" }),
  // Honeypot: hidden field. Real users leave it empty; if it's filled the
  // route silently accepts and discards the submission.
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
