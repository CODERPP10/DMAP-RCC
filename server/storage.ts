import { 
  users, type User, type InsertUser,
  company, type Company, type InsertCompany,
  about, type About, type InsertAbout,
  contact, type Contact, type InsertContact,
  certifications, type Certification, type InsertCertification,
  services, type Service, type InsertService,
  projects, type Project, type InsertProject,
  clients, type Client, type InsertClient,
  blogPosts, type BlogPost, type InsertBlogPost,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  testimonials, type Testimonial, type InsertTestimonial,
  newsletterSubscribers, type NewsletterSubscriber, type InsertNewsletterSubscriber
} from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

/**
 * Interface for storage operations
 * Defines methods to interact with the database
 */
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Company methods
  getCompany(): Promise<Company | undefined>;
  updateCompany(company: InsertCompany): Promise<Company>;
  
  // About methods
  getAbout(): Promise<About | undefined>;
  updateAbout(about: InsertAbout): Promise<About>;
  
  // Contact methods
  getContact(): Promise<Contact | undefined>;
  updateContact(contact: InsertContact): Promise<Contact>;
  
  // Certification methods
  getAllCertifications(): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  deleteCertification(id: number): Promise<void>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<void>;
  
  // Project methods
  getAllProjects(status?: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<void>;
  
  // Client methods
  getAllClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  deleteClient(id: number): Promise<void>;
  
  // Blog methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<void>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<void>;
  
  // Newsletter subscribers
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
}

/**
 * Database storage implementation
 * Uses Drizzle ORM to interact with PostgreSQL database
 */
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Company methods
  async getCompany(): Promise<Company | undefined> {
    const [companyData] = await db.select().from(company).limit(1);
    return companyData;
  }
  
  async updateCompany(companyData: InsertCompany): Promise<Company> {
    const existing = await this.getCompany();
    
    if (existing) {
      // Update existing company info
      const [updated] = await db
        .update(company)
        .set({...companyData, updatedAt: new Date()})
        .where(eq(company.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new company info
      const [created] = await db
        .insert(company)
        .values(companyData)
        .returning();
      return created;
    }
  }
  
  // About methods
  async getAbout(): Promise<About | undefined> {
    const [aboutData] = await db.select().from(about).limit(1);
    return aboutData;
  }
  
  async updateAbout(aboutData: InsertAbout): Promise<About> {
    const existing = await this.getAbout();
    
    if (existing) {
      // Update existing about info
      const [updated] = await db
        .update(about)
        .set({...aboutData, updatedAt: new Date()})
        .where(eq(about.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new about info
      const [created] = await db
        .insert(about)
        .values(aboutData)
        .returning();
      return created;
    }
  }
  
  // Contact methods
  async getContact(): Promise<Contact | undefined> {
    const [contactData] = await db.select().from(contact).limit(1);
    return contactData;
  }
  
  async updateContact(contactData: InsertContact): Promise<Contact> {
    const existing = await this.getContact();
    
    if (existing) {
      // Update existing contact info
      const [updated] = await db
        .update(contact)
        .set({...contactData, updatedAt: new Date()})
        .where(eq(contact.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new contact info
      const [created] = await db
        .insert(contact)
        .values(contactData)
        .returning();
      return created;
    }
  }
  
  // Certification methods
  async getAllCertifications(): Promise<Certification[]> {
    return db.select().from(certifications);
  }
  
  async createCertification(certificationData: InsertCertification): Promise<Certification> {
    const [created] = await db
      .insert(certifications)
      .values(certificationData)
      .returning();
    return created;
  }
  
  async deleteCertification(id: number): Promise<void> {
    await db.delete(certifications).where(eq(certifications.id, id));
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return db.select().from(services);
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }
  
  async createService(serviceData: InsertService): Promise<Service> {
    const [created] = await db
      .insert(services)
      .values(serviceData)
      .returning();
    return created;
  }
  
  async updateService(id: number, serviceData: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await db
      .update(services)
      .set({...serviceData, updatedAt: new Date()})
      .where(eq(services.id, id))
      .returning();
    return updated;
  }
  
  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }
  
  // Project methods
  async getAllProjects(status?: string): Promise<Project[]> {
    if (status) {
      return db.select().from(projects).where(eq(projects.status, status));
    }
    return db.select().from(projects);
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async createProject(projectData: InsertProject): Promise<Project> {
    const [created] = await db
      .insert(projects)
      .values(projectData)
      .returning();
    return created;
  }
  
  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const [updated] = await db
      .update(projects)
      .set({...projectData, updatedAt: new Date()})
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }
  
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }
  
  // Client methods
  async getAllClients(): Promise<Client[]> {
    return db.select().from(clients);
  }
  
  async createClient(clientData: InsertClient): Promise<Client> {
    const [created] = await db
      .insert(clients)
      .values(clientData)
      .returning();
    return created;
  }
  
  async deleteClient(id: number): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }
  
  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(sql`${blogPosts.date} DESC`);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }
  
  async createBlogPost(postData: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db
      .insert(blogPosts)
      .values(postData)
      .returning();
    return created;
  }
  
  async updateBlogPost(id: number, postData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({...postData, updatedAt: new Date()})
      .where(eq(blogPosts.id, id))
      .returning();
    return updated;
  }
  
  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }
  
  // Contact submissions
  async createContactSubmission(submissionData: InsertContactSubmission): Promise<ContactSubmission> {
    const [created] = await db
      .insert(contactSubmissions)
      .values(submissionData)
      .returning();
    return created;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions).orderBy(sql`${contactSubmissions.createdAt} DESC`);
  }
  
  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials);
  }
  
  async createTestimonial(testimonialData: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db
      .insert(testimonials)
      .values(testimonialData)
      .returning();
    return created;
  }
  
  async updateTestimonial(id: number, testimonialData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set({...testimonialData, updatedAt: new Date()})
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }
  
  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
  
  // Newsletter subscribers
  async createNewsletterSubscriber(subscriberData: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [created] = await db
      .insert(newsletterSubscribers)
      .values(subscriberData)
      .returning();
    return created;
  }
  
  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers);
  }
}

// Create and export a singleton instance of the storage
export const storage = new DatabaseStorage();
