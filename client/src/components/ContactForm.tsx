import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { contactSchema, type ContactInput } from "@shared/contact";

/** Contact form — posts to /api/contact (server emails the submission). */
const ContactForm = ({ className = "bg-white p-8 rounded-lg shadow-md" }: { className?: string }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", company: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) {
        throw new Error(body.message || "Request failed");
      }
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      form.reset();
    } catch (err) {
      toast({
        title: "Something went wrong",
        description:
          err instanceof Error ? err.message : "Please try again, or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:border-transparent";
  const errClass = (bad: unknown) => `${inputBase} ${bad ? "border-red-500" : "border-gray-300"}`;

  return (
    <form className={className} onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {/* Honeypot — visually hidden, not tab-reachable. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
      </div>

      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          className={errClass(form.formState.errors.name)}
          placeholder="Enter your name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-red-500 text-sm">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          className={errClass(form.formState.errors.email)}
          placeholder="Enter your email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-red-500 text-sm">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          className={`${inputBase} border-gray-300`}
          placeholder="Enter your phone number"
          {...form.register("phone")}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
        <textarea
          id="message"
          rows={5}
          className={errClass(form.formState.errors.message)}
          placeholder="Tell us about your project"
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="mt-1 text-red-500 text-sm">{form.formState.errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--secondary-600)] hover:bg-[var(--secondary-700)] text-white py-3 px-6 rounded-md font-medium transition disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
