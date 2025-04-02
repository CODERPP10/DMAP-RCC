import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as fs from 'fs';
import * as path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide name, email, and message' 
        });
      }
      
      // In a real implementation, this would send an email
      // For now, we'll just return a success message
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! We will contact you soon.' 
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error. Please try again later.' 
      });
    }
  });

  // API route for newsletter subscription
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please provide an email address' 
        });
      }
      
      // In a real implementation, this would add the email to a newsletter list
      // For now, we'll just return a success message
      
      return res.status(200).json({ 
        success: true, 
        message: 'Successfully subscribed to the newsletter!' 
      });
    } catch (error) {
      console.error('Error processing subscription:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error. Please try again later.' 
      });
    }
  });

  // Serve the brochure PDF file
  app.get('/brochure.pdf', (_req, res) => {
    // Create a simple text file explaining that this is a placeholder
    const brochureText = 'This is a placeholder for the DMAP Construction brochure PDF.\n\n' +
                         'In a production environment, this would be an actual PDF document with information about the company\'s services, projects, and contact details.';
    
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename="DMAP-Construction-Brochure.pdf"');
    res.send(brochureText);
  });

  const httpServer = createServer(app);

  return httpServer;
}
