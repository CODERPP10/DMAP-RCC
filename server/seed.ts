/**
 * Database seeding script
 * Populates the database with initial data from JSON files
 */
import { db } from './db';
import { storage } from './storage';
import { 
  company,
  about,
  contact,
  certifications,
  services,
  projects,
  clients,
} from '@shared/schema';

/**
 * Seed company information
 */
async function seedCompany() {
  const companyData = {
    name: "DMAP Retrofit Construction Company",
    tagline: "Experts in Retrofitting, Reconstruction & Civil Works",
    mission: "Reinforcing India's infrastructure with precision, integrity, and reliability."
  };
  
  console.log('Seeding company information...');
  await storage.updateCompany(companyData);
}

/**
 * Seed about information
 */
async function seedAbout() {
  const aboutData = {
    description: "DMAP Retrofit Construction Company is a civil engineering firm with over 5 years of experience, specializing in the strengthening, restoration, and reconstruction of buildings and infrastructure across India. Our operations are powered by a team of experienced technical contractors, guided by strong industry expertise and a commitment to quality, safety, and compliance.",
    domains: [
      "Public and government buildings",
      "Residential and commercial complexes",
      "Institutional and industrial projects",
      "Infrastructure and utility structures"
    ]
  };
  
  console.log('Seeding about information...');
  await storage.updateAbout(aboutData);
}

/**
 * Seed contact information
 */
async function seedContact() {
  const contactData = {
    phone: "+91-9987082530",
    email: "dmaprccmum@gmail.com",
    location: "Fort, Mumbai, Maharashtra"
  };
  
  console.log('Seeding contact information...');
  await storage.updateContact(contactData);
}

/**
 * Seed certifications
 */
async function seedCertifications() {
  const certificationsList = [
    "MSME Registered",
    "GST Compliant",
    "ESIC Licensed",
    "EPF for Technical Contractor Network",
    "Full Documentation and Tax Invoice System",
    "Safety-focused Execution"
  ];
  
  console.log('Seeding certifications...');
  
  // Clear existing certifications
  await db.delete(certifications);
  
  // Add each certification
  for (const name of certificationsList) {
    await storage.createCertification({ name });
  }
}

/**
 * Seed services
 */
async function seedServices() {
  const servicesList = [
    "Seismic Retrofitting",
    "RCC Jacketing & Structural Strengthening",
    "Concrete Crack Injection & Repairs",
    "Waterproofing Solutions",
    "Structural Steel Fabrication",
    "Residential, Commercial & Industrial Civil Works",
    "Infrastructure Project Execution",
    "On-site Technical Consultation & Supervision"
  ];
  
  console.log('Seeding services...');
  
  // Clear existing services
  await db.delete(services);
  
  // Add each service with placeholder descriptions
  for (const title of servicesList) {
    await storage.createService({
      title,
      shortDescription: `Professional ${title.toLowerCase()} services provided by DMAP Retrofit Construction Company.`,
      fullDescription: `Our ${title.toLowerCase()} services are delivered with the highest standards of quality and safety, ensuring optimal results for your construction and infrastructure needs.`,
      benefits: ["Cost-effective solutions", "Expert technical team", "Quality assurance", "Timely delivery"]
    });
  }
}

/**
 * Seed projects
 */
async function seedProjects() {
  const projectsList = [
    {
      title: "MTNL TE Building \u2013 Cuffe Parade, Mumbai",
      description: "Structural strengthening of beams and columns for service continuity."
    },
    {
      title: "MTNL TE Buildings \u2013 Vashi & Turbhe, Navi Mumbai",
      description: "External repairs, stairwell upgrades, and structural retrofitting of telecom buildings."
    },
    {
      title: "MTNL TE Building \u2013 Fort, Mumbai",
      description: "Floor slab restoration, fountain structure repairs, and RCC enhancement using fiber wrapping."
    },
    {
      title: "Acharya Atre CHS, Navi Mumbai",
      description: "Seismic retrofitting and structural works."
    },
    {
      title: "Meteorological Centre \u2013 Colaba, Mumbai",
      description: "Terrace waterproofing and structural protection."
    },
    {
      title: "Deepak Builder Project \u2013 Nashik",
      description: "Column strengthening and concrete rehabilitation."
    },
    {
      title: "Goodway Chemicals \u2013 Sarigram, Umbergaon, Gujarat",
      description: "Composite structural wrapping and enhancement."
    },
    {
      title: "Invera Testing & Inspection Lab Pvt. Ltd.",
      description: "Advanced structural strengthening works."
    },
    {
      title: "Jawadwala Construction Projects \u2013 PAN India",
      description: "Civil and structural retrofitting and restoration."
    },
    {
      title: "ShreeJee Plaza \u2013 Siddharth Enterprises",
      description: "Composite Carbon Fibre Wrapping."
    }
  ];
  
  console.log('Seeding projects...');
  
  // Clear existing projects
  await db.delete(projects);
  
  // Add each project
  for (const project of projectsList) {
    const location = project.title.split('–')[1]?.trim() || 'Maharashtra, India';
    
    await storage.createProject({
      title: project.title,
      shortDescription: project.description,
      fullDescription: `${project.title}: ${project.description} This project showcases our expertise in structural engineering and retrofitting solutions.`,
      status: Math.random() > 0.7 ? 'ongoing' : 'completed', // Random status for demonstration
      location: location,
      services: ["Structural Strengthening", "Retrofitting"],
      client: "DMAP Construction Client",
      completion: Math.random() > 0.7 ? 'In Progress' : 'Completed'
    });
  }
}

/**
 * Seed clients
 */
async function seedClients() {
  const clientsList = [
    "Good Will Chemical (Maruti Construction)",
    "Sarigram",
    "Mahendra Realtors and Infra Ltd",
    "Shrikrishna Construction",
    "Niroshi Construction",
    "Siddharth Enterprises (Shrejee)",
    "J Kumar",
    "Prasar Bharti",
    "Invra Lab",
    "Jawadwala Construction"
  ];
  
  console.log('Seeding clients...');
  
  // Clear existing clients
  await db.delete(clients);
  
  // Add each client
  for (const name of clientsList) {
    await storage.createClient({ name });
  }
}

/**
 * Main seed function
 */
async function seed() {
  try {
    console.log('Starting database seeding...');
    
    // Run all seed functions
    await seedCompany();
    await seedAbout();
    await seedContact();
    await seedCertifications();
    await seedServices();
    await seedProjects();
    await seedClients();
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seed();