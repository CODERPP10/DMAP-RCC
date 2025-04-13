import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Company information
export const company = pgTable("company", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  mission: text("mission").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const companyInsertSchema = createInsertSchema(company).pick({
  name: true,
  tagline: true,
  mission: true,
});

// About section
export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  domains: text("domains").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aboutInsertSchema = createInsertSchema(about).pick({
  description: true,
  domains: true,
});

// Contact information
export const contact = pgTable("contact", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactInsertSchema = createInsertSchema(contact).pick({
  phone: true,
  email: true,
  location: true,
});

// Certifications
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const certificationInsertSchema = createInsertSchema(certifications).pick({
  name: true,
});

// Services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  imageUrl: text("image_url"),
  benefits: text("benefits").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const serviceInsertSchema = createInsertSchema(services).pick({
  title: true,
  shortDescription: true,
  fullDescription: true,
  imageUrl: true,
  benefits: true,
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description"),
  imageUrl: text("image_url"),
  completion: text("completion"),
  location: text("location"),
  client: text("client"),
  status: text("status").default("completed").notNull(), // "ongoing" or "completed"
  services: text("services").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projectInsertSchema = createInsertSchema(projects).pick({
  title: true,
  shortDescription: true,
  fullDescription: true,
  imageUrl: true,
  completion: true,
  location: true,
  client: true,
  status: true,
  services: true,
});

// Clients
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const clientInsertSchema = createInsertSchema(clients).pick({
  name: true,
  logoUrl: true,
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  author: text("author").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPostInsertSchema = createInsertSchema(blogPosts).pick({
  slug: true,
  title: true,
  date: true,
  excerpt: true,
  content: true,
  imageUrl: true,
  author: true,
  tags: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissionInsertSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  message: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),
  halfStar: boolean("half_star").default(false),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonialInsertSchema = createInsertSchema(testimonials).pick({
  name: true,
  title: true,
  quote: true,
  rating: true,
  halfStar: true,
  avatarUrl: true,
});

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscriberInsertSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
});

// Define relations (if needed)
export const projectsRelations = relations(projects, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  projects: many(projects),
}));

// Types
export type Company = typeof company.$inferSelect;
export type InsertCompany = z.infer<typeof companyInsertSchema>;

export type About = typeof about.$inferSelect;
export type InsertAbout = z.infer<typeof aboutInsertSchema>;

export type Contact = typeof contact.$inferSelect;
export type InsertContact = z.infer<typeof contactInsertSchema>;

export type Certification = typeof certifications.$inferSelect;
export type InsertCertification = z.infer<typeof certificationInsertSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof serviceInsertSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof projectInsertSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof clientInsertSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof blogPostInsertSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof contactSubmissionInsertSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof testimonialInsertSchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof newsletterSubscriberInsertSchema>;

// Keep the users table for authentication if needed
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
