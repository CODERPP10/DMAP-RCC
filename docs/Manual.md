# DMAP Construction Website Manual

## Project Overview

The DMAP Construction website is a professional website for DMAP Retrofit Construction Company, a civil engineering firm specializing in strengthening, restoration, and reconstruction of buildings and infrastructure across India. The website showcases the company's services, projects, testimonials, and provides contact information.

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS with ShadCN UI components
- **State Management**: React Query for data fetching
- **Routing**: Wouter for client-side routing
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build Tool**: Vite

## Architecture

The project follows a modern web application architecture:

1. **Client-Side**: React frontend with reusable components
2. **Server-Side**: Express.js API for data access
3. **Database**: PostgreSQL for data persistence
4. **API Layer**: RESTful API endpoints for data CRUD operations

### Directory Structure

```
├── client/                  # Frontend code
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── data/            # Static data files
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main application component
│   │   ├── index.css        # Global styles
│   │   └── main.tsx         # Application entry point
│   └── index.html           # HTML entry point
├── docs/                    # Documentation
├── public/                  # Static assets
├── server/                  # Backend code
│   ├── db.ts                # Database connection
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── seed.ts              # Database seeding script
│   ├── storage.ts           # Data access layer
│   └── vite.ts              # Vite server configuration
└── shared/                  # Shared code between client and server
    └── schema.ts            # Database schema and types
```

## File Details

### Frontend Files

#### `client/src/main.tsx`
Entry point for the React application. Sets up React Query provider and renders the App component.

#### `client/src/App.tsx`
Main application component that defines routes and renders the layout.

#### `client/src/components/`
Contains all reusable UI components organized by feature:
- `blog/`: Blog-related components like BlogCard
- `home/`: Homepage components like HeroSection, ServicesOverview, etc.
- `layout/`: Layout components like Navbar and Footer
- `projects/`: Project-related components like ProjectCard
- `services/`: Service-related components like ServiceCard
- `ui/`: ShadCN UI components

#### `client/src/pages/`
Contains page components for each route:
- `Home.tsx`: Homepage
- `About.tsx`: About page
- `Services.tsx`: Services page
- `Projects.tsx`: Projects page
- `Blog.tsx`: Blog page
- `Contact.tsx`: Contact page
- `not-found.tsx`: 404 page

#### `client/src/data/`
Contains static data used in the application:
- `blog.ts`: Blog post data
- `projects.ts`: Project data
- `services.ts`: Services data
- `testimonials.ts`: Testimonial data

#### `client/src/hooks/`
Custom React hooks:
- `use-mobile.tsx`: Hook for detecting mobile devices
- `use-toast.ts`: Hook for displaying toast notifications

#### `client/src/lib/`
Utility functions:
- `queryClient.ts`: React Query configuration
- `utils.ts`: Common utility functions

### Backend Files

#### `server/index.ts`
Server entry point that sets up Express, middleware, and starts the HTTP server.

#### `server/routes.ts`
Defines all API routes for the application, organized by feature:
- Contact form endpoints
- Newsletter subscription endpoint
- Company information endpoints
- About information endpoints
- Certifications endpoints
- Services endpoints
- Projects endpoints
- Clients endpoints
- Blog posts endpoints
- Testimonials endpoints

#### `server/storage.ts`
Implements the data access layer with the DatabaseStorage class that provides CRUD operations for all data types.

#### `server/db.ts`
Sets up the database connection with Drizzle ORM.

#### `server/seed.ts`
Script for seeding the database with initial data.

#### `server/vite.ts`
Configures Vite for development and production.

### Shared Files

#### `shared/schema.ts`
Defines the database schema and types using Drizzle ORM and Zod:
- Company information
- About information
- Contact information
- Certifications
- Services
- Projects
- Clients
- Blog posts
- Contact form submissions
- Testimonials
- Newsletter subscribers
- Users

## Database Schema

### Tables

#### `company`
Stores company information including name, tagline, and mission.

#### `about`
Stores the about section content including description and domains.

#### `contact`
Stores contact information including phone, email, and location.

#### `certifications`
Stores the company's certifications.

#### `services`
Stores service information including title, description, and benefits.

#### `projects`
Stores project information including title, description, status, and client.

#### `clients`
Stores client information.

#### `blog_posts`
Stores blog posts including title, content, author, and publication date.

#### `testimonials`
Stores client testimonials including name, quote, and rating.

#### `contact_submissions`
Stores contact form submissions.

#### `newsletter_subscribers`
Stores newsletter subscriber emails.

#### `users`
Stores user information for authentication.

## API Endpoints

### Company Information
- `GET /api/company`: Get company information
- `POST /api/company`: Update company information

### About Information
- `GET /api/about`: Get about information
- `POST /api/about`: Update about information

### Contact Information
- `GET /api/contact-info`: Get contact information
- `POST /api/contact-info`: Update contact information

### Certifications
- `GET /api/certifications`: Get all certifications
- `POST /api/certifications`: Create a certification
- `DELETE /api/certifications/:id`: Delete a certification

### Services
- `GET /api/services`: Get all services
- `GET /api/services/:id`: Get a service by ID
- `POST /api/services`: Create a service
- `PUT /api/services/:id`: Update a service
- `DELETE /api/services/:id`: Delete a service

### Projects
- `GET /api/projects`: Get all projects (with optional status filter)
- `GET /api/projects/:id`: Get a project by ID
- `POST /api/projects`: Create a project
- `PUT /api/projects/:id`: Update a project
- `DELETE /api/projects/:id`: Delete a project

### Clients
- `GET /api/clients`: Get all clients
- `POST /api/clients`: Create a client
- `DELETE /api/clients/:id`: Delete a client

### Blog Posts
- `GET /api/blog`: Get all blog posts
- `GET /api/blog/:slug`: Get a blog post by slug

### Testimonials
- `GET /api/testimonials`: Get all testimonials

### Contact Form
- `POST /api/contact`: Submit a contact form

### Newsletter
- `POST /api/subscribe`: Subscribe to the newsletter

### Static Assets
- `GET /brochure.pdf`: Get the company brochure

## Database Operations

The application uses the Drizzle ORM for database operations. The `storage.ts` file provides a consistent interface for all database operations.

### Example: Creating a Service

```typescript
const service = await storage.createService({
  title: "Seismic Retrofitting",
  shortDescription: "Professional seismic retrofitting services",
  fullDescription: "Our seismic retrofitting services are delivered with the highest standards...",
  benefits: ["Cost-effective solutions", "Expert technical team"]
});
```

### Example: Getting All Projects

```typescript
// Get all projects
const allProjects = await storage.getAllProjects();

// Get only ongoing projects
const ongoingProjects = await storage.getAllProjects("ongoing");
```

## Frontend Data Fetching

The frontend uses React Query for data fetching. Here's an example of fetching services:

```typescript
const { data: services, isLoading, error } = useQuery({
  queryKey: ['/api/services'],
  refetchOnWindowFocus: false
});

if (isLoading) return <div>Loading services...</div>;
if (error) return <div>Error loading services</div>;

return (
  <div>
    {services.data.map(service => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </div>
);
```

## Deployment

The application can be deployed using Replit Deployments. The build script in `package.json` builds both the frontend and backend:

```json
"build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
```

## Maintenance

### Adding a New Service

1. Add the service to the database through the API or seed script
2. Update the UI components if needed

### Adding a New Page

1. Create a new page component in `client/src/pages/`
2. Add the route in `client/src/App.tsx`
3. Update the navigation in `client/src/components/layout/Navbar.tsx`

### Database Schema Changes

1. Update the schema in `shared/schema.ts`
2. Run `npm run db:push` to apply the changes
3. Update the storage methods in `server/storage.ts` if needed
4. Update the API endpoints in `server/routes.ts` if needed

## Troubleshooting

For common issues and their solutions, refer to the [Troubleshooting Guide](./Troubleshooting.md).

---

*This manual is a living document and will be updated as the project evolves.*