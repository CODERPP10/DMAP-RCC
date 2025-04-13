import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as fs from 'fs';
import * as path from 'path';
import { 
  contactSubmissionInsertSchema, 
  newsletterSubscriberInsertSchema,
  serviceInsertSchema,
  projectInsertSchema,
  companyInsertSchema,
  aboutInsertSchema,
  contactInsertSchema,
  certificationInsertSchema,
  clientInsertSchema 
} from "@shared/schema";
import { z } from "zod";

/**
 * Register all API routes for the application
 * @param app - Express application instance
 * @returns HTTP server instance
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to handle errors
  const errorHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
          success: false, 
          message: 'Server error. Please try again later.' 
        });
      }
    };
  };

  /*
   * CONTACT FORM ENDPOINTS
   */
  // Get contact information
  app.get('/api/contact-info', errorHandler(async (_req, res) => {
    const contactInfo = await storage.getContact();
    res.json({ success: true, data: contactInfo });
  }));

  // Update contact information
  app.post('/api/contact-info', errorHandler(async (req, res) => {
    try {
      const data = contactInsertSchema.parse(req.body);
      const contactInfo = await storage.updateContact(data);
      res.json({ success: true, data: contactInfo });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // API route for contact form submission
  app.post('/api/contact', errorHandler(async (req, res) => {
    try {
      const data = contactSubmissionInsertSchema.parse(req.body);
      
      // Save submission to database
      const submission = await storage.createContactSubmission(data);
      
      // In a real implementation, this would also send an email
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! We will contact you soon.',
        data: submission 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  /*
   * NEWSLETTER ENDPOINTS
   */
  // API route for newsletter subscription
  app.post('/api/subscribe', errorHandler(async (req, res) => {
    try {
      const data = newsletterSubscriberInsertSchema.parse(req.body);
      
      // Save subscriber to database
      const subscriber = await storage.createNewsletterSubscriber(data);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to the newsletter!',
        data: subscriber
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  /*
   * COMPANY INFORMATION ENDPOINTS
   */
  // Get company information
  app.get('/api/company', errorHandler(async (_req, res) => {
    const companyInfo = await storage.getCompany();
    res.json({ success: true, data: companyInfo });
  }));

  // Update company information
  app.post('/api/company', errorHandler(async (req, res) => {
    try {
      const data = companyInsertSchema.parse(req.body);
      const companyInfo = await storage.updateCompany(data);
      res.json({ success: true, data: companyInfo });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  /*
   * ABOUT INFORMATION ENDPOINTS
   */
  // Get about information
  app.get('/api/about', errorHandler(async (_req, res) => {
    const aboutInfo = await storage.getAbout();
    res.json({ success: true, data: aboutInfo });
  }));

  // Update about information
  app.post('/api/about', errorHandler(async (req, res) => {
    try {
      const data = aboutInsertSchema.parse(req.body);
      const aboutInfo = await storage.updateAbout(data);
      res.json({ success: true, data: aboutInfo });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  /*
   * CERTIFICATIONS ENDPOINTS
   */
  // Get all certifications
  app.get('/api/certifications', errorHandler(async (_req, res) => {
    const certifications = await storage.getAllCertifications();
    res.json({ success: true, data: certifications });
  }));

  // Create certification
  app.post('/api/certifications', errorHandler(async (req, res) => {
    try {
      const data = certificationInsertSchema.parse(req.body);
      const certification = await storage.createCertification(data);
      res.json({ success: true, data: certification });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Delete certification
  app.delete('/api/certifications/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteCertification(id);
    res.json({ success: true });
  }));

  /*
   * SERVICES ENDPOINTS
   */
  // Get all services
  app.get('/api/services', errorHandler(async (_req, res) => {
    const services = await storage.getAllServices();
    res.json({ success: true, data: services });
  }));

  // Get service by ID
  app.get('/api/services/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const service = await storage.getService(id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    res.json({ success: true, data: service });
  }));

  // Create service
  app.post('/api/services', errorHandler(async (req, res) => {
    try {
      const data = serviceInsertSchema.parse(req.body);
      const service = await storage.createService(data);
      res.json({ success: true, data: service });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Update service
  app.put('/api/services/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // Validate service exists
    const existing = await storage.getService(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    try {
      // Partial validation to allow updates to only some fields
      const updatedService = await storage.updateService(id, req.body);
      res.json({ success: true, data: updatedService });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Delete service
  app.delete('/api/services/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteService(id);
    res.json({ success: true });
  }));

  /*
   * PROJECTS ENDPOINTS
   */
  // Get all projects or filter by status
  app.get('/api/projects', errorHandler(async (req, res) => {
    const status = req.query.status as string | undefined;
    const projects = await storage.getAllProjects(status);
    res.json({ success: true, data: projects });
  }));

  // Get project by ID
  app.get('/api/projects/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await storage.getProject(id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  }));

  // Create project
  app.post('/api/projects', errorHandler(async (req, res) => {
    try {
      const data = projectInsertSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.json({ success: true, data: project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Update project
  app.put('/api/projects/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // Validate project exists
    const existing = await storage.getProject(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    try {
      // Partial validation to allow updates to only some fields
      const updatedProject = await storage.updateProject(id, req.body);
      res.json({ success: true, data: updatedProject });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Delete project
  app.delete('/api/projects/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteProject(id);
    res.json({ success: true });
  }));

  /*
   * CLIENTS ENDPOINTS
   */
  // Get all clients
  app.get('/api/clients', errorHandler(async (_req, res) => {
    const clients = await storage.getAllClients();
    res.json({ success: true, data: clients });
  }));

  // Create client
  app.post('/api/clients', errorHandler(async (req, res) => {
    try {
      const data = clientInsertSchema.parse(req.body);
      const client = await storage.createClient(data);
      res.json({ success: true, data: client });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid data provided',
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Delete client
  app.delete('/api/clients/:id', errorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteClient(id);
    res.json({ success: true });
  }));

  /*
   * BLOG POSTS ENDPOINTS
   */
  // Get all blog posts
  app.get('/api/blog', errorHandler(async (_req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json({ success: true, data: posts });
  }));

  // Get blog post by slug
  app.get('/api/blog/:slug', errorHandler(async (req, res) => {
    const slug = req.params.slug;
    const post = await storage.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    res.json({ success: true, data: post });
  }));

  /*
   * TESTIMONIALS ENDPOINTS
   */
  // Get all testimonials
  app.get('/api/testimonials', errorHandler(async (_req, res) => {
    const testimonials = await storage.getAllTestimonials();
    res.json({ success: true, data: testimonials });
  }));

  /*
   * STATIC ASSETS
   */
  // Serve the brochure PDF file
  app.get('/brochure.pdf', (_req, res) => {
    const brochurePath = path.join(process.cwd(), 'public', 'brochure.pdf');
    
    if (fs.existsSync(brochurePath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="DMAP-Construction-Brochure.pdf"');
      const fileStream = fs.createReadStream(brochurePath);
      fileStream.pipe(res);
    } else {
      // Fallback if file doesn't exist
      const brochureText = 'This is a placeholder for the DMAP Construction brochure PDF.\n\n' +
                           'In a production environment, this would be an actual PDF document with information about the company\'s services, projects, and contact details.';
      
      res.set('Content-Type', 'application/pdf');
      res.set('Content-Disposition', 'attachment; filename="DMAP-Construction-Brochure.pdf"');
      res.send(brochureText);
    }
  });

  // Create and return the HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
