# DMAP Construction Website Troubleshooting Guide

This document contains common issues that might occur with the DMAP Construction website and their solutions.

## Table of Contents

1. [Database Connection Issues](#database-connection-issues)
2. [API Endpoint Errors](#api-endpoint-errors)
3. [Frontend Rendering Problems](#frontend-rendering-problems)
4. [Performance Issues](#performance-issues)
5. [Deployment Problems](#deployment-problems)

---

## Database Connection Issues

### Issue: Unable to connect to PostgreSQL database

**Symptoms:**
- Server fails to start with error messages about database connection
- API calls return 500 errors
- Console shows "Connection refused" or "Authentication failed" errors

**Possible Causes:**
- Database environment variables missing or incorrect
- PostgreSQL service not running
- Network connectivity issues
- Incorrect credentials

**Solutions:**
1. Verify all required environment variables are present:
   ```
   DATABASE_URL, PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE
   ```

2. Check database credentials:
   ```bash
   # Test connection with credentials
   psql -U $PGUSER -h $PGHOST -p $PGPORT -d $PGDATABASE
   ```

3. Ensure database service is running:
   ```bash
   # Check if PostgreSQL is accessible
   nc -zv $PGHOST $PGPORT
   ```

### Issue: Schema Migration Failures

**Symptoms:**
- `npm run db:push` command fails
- Error messages about conflicting schema changes
- Database tables missing or have incorrect structure

**Solutions:**
1. Check schema definitions in `shared/schema.ts` for errors:
   - Ensure foreign key references are correct
   - Check for typos in column names
   - Verify data types are appropriate

2. Run migrations with verbose logging:
   ```bash
   NODE_ENV=development npm run db:push
   ```

3. For severe issues, consider resetting the database schema:
   ```bash
   # Warning: This will delete all data
   drizzle-kit drop
   npm run db:push
   tsx server/seed.ts
   ```

---

## API Endpoint Errors

### Issue: 404 Not Found Errors

**Symptoms:**
- API requests to valid endpoints return 404
- Frontend shows "Resource not found" errors

**Possible Causes:**
- Route path defined incorrectly
- Server not registering routes properly
- Request using incorrect HTTP method

**Solutions:**
1. Check route definitions in `server/routes.ts`
2. Verify HTTP method matches (GET vs POST, etc.)
3. Ensure Express app is mounting routes correctly:
   ```typescript
   // In server/index.ts
   await registerRoutes(app);
   ```

### Issue: 400 Bad Request Errors

**Symptoms:**
- API requests return 400 status code
- Validation errors in response

**Possible Causes:**
- Request body missing required fields
- Data type mismatch in request payload
- Zod schema validation failing

**Solutions:**
1. Check request payload against the expected schema
2. Verify Zod schema definitions in `shared/schema.ts`
3. Enable detailed validation errors in development:
   ```typescript
   if (error instanceof z.ZodError) {
     return res.status(400).json({
       success: false,
       message: 'Invalid data provided',
       errors: error.errors // Detailed validation errors
     });
   }
   ```

### Issue: 500 Server Errors

**Symptoms:**
- API endpoints return 500 status code
- Server logs show uncaught exceptions

**Possible Causes:**
- Unhandled database errors
- Logic errors in route handlers
- Missing error handling

**Solutions:**
1. Add try/catch blocks to route handlers
2. Implement the errorHandler middleware
3. Check for null/undefined values before operations

---

## Frontend Rendering Problems

### Issue: Components Not Rendering Data

**Symptoms:**
- Pages load but no data appears
- Console shows errors related to undefined properties
- Loading states persist indefinitely

**Possible Causes:**
- API requests failing
- Data structure mismatch between backend and frontend
- Missing error handling in React Query

**Solutions:**
1. Verify API responses in browser developer tools
2. Check React Query implementation:
   ```typescript
   const { data, isLoading, error } = useQuery({
     queryKey: ['/api/services'],
     refetchOnWindowFocus: false
   });
   
   // Add proper error handling
   if (error) {
     console.error('Error fetching data:', error);
     return <div>Error loading services. Please try again.</div>;
   }
   ```

3. Check type definitions for consistency between frontend and backend

### Issue: Styling or Layout Problems

**Symptoms:**
- UI elements misaligned or overlapping
- Responsive design breaking at certain screen sizes
- Inconsistent appearance across browsers

**Solutions:**
1. Verify Tailwind CSS classes are applied correctly
2. Check for CSS conflicts in component-specific styles
3. Use browser dev tools to inspect the layout
4. Test on multiple browsers and screen sizes

---

## Performance Issues

### Issue: Slow Page Loading

**Symptoms:**
- Pages take a long time to become interactive
- API requests are slow to respond
- High resource usage (CPU/Memory)

**Possible Causes:**
- Inefficient database queries
- Missing indexes on frequently accessed fields
- Too many parallel requests
- Large image assets not optimized

**Solutions:**
1. Add database indexes for frequently queried fields
2. Implement query caching with React Query
3. Optimize image sizes and use lazy loading
4. Implement pagination for large data sets

### Issue: Memory Leaks

**Symptoms:**
- Application slows down over time
- Server memory usage continuously increases
- Eventually crashes with "out of memory" errors

**Possible Causes:**
- Unclosed database connections
- Subscriptions or event listeners not properly cleaned up
- Large data sets kept in memory

**Solutions:**
1. Ensure database connections are properly closed
2. Use `useEffect` cleanup function to unsubscribe:
   ```jsx
   useEffect(() => {
     // Subscribe to event
     const subscription = someService.subscribe();
     
     // Return cleanup function
     return () => {
       subscription.unsubscribe();
     };
   }, []);
   ```

3. Implement proper connection pooling for database access

---

## Deployment Problems

### Issue: Build Failures

**Symptoms:**
- Build process fails with compilation errors
- TypeScript type checking errors
- Module resolution errors

**Possible Causes:**
- Type mismatches in code
- Missing dependencies
- Configuration issues in build setup

**Solutions:**
1. Run TypeScript checks before build:
   ```bash
   npm run check
   ```

2. Verify all dependencies are installed:
   ```bash
   npm ci
   ```

3. Check build configuration in `vite.config.ts`

### Issue: Production Environment Differences

**Symptoms:**
- Application works in development but fails in production
- API endpoints return errors only in production
- Static assets not found

**Possible Causes:**
- Environment variables not set in production
- Path differences between development and production
- Permissions issues in production environment

**Solutions:**
1. Verify all required environment variables are set in production
2. Use relative paths for assets and API endpoints
3. Check server logs for production-specific errors

---

## Recent Issues and Fixes

### Issue: Database Schema Migration Failed During Implementation

**Date:** April 13, 2025

**Problem:**
During initial database implementation, the schema migration failed with an error about invalid column types.

**Root Cause:**
The `timestamp` type in Drizzle ORM was being used without the proper import from the PostgreSQL adapter.

**Fix:**
Added the proper import for timestamp from the PostgreSQL adapter:
```typescript
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
```

---

*This troubleshooting guide will be updated as new issues are discovered and resolved.*