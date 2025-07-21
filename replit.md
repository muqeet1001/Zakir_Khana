# Zakir Khan Website - Replit.md

## Overview

This is a full-stack React application for a fictional celebrity brand website for Indian stand-up comedian Zakir Khan. The website features a modern, animated design with premium merchandise, live show bookings, and an immersive user experience powered by 3D graphics and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **3D Graphics**: React Three Fiber with Drei helpers for Three.js integration
- **Animations**: CSS transitions, transforms, and Intersection Observer API for scroll-triggered animations

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage for development (designed for database sessions in production)
- **API**: RESTful endpoints for products, shows, cart, and orders

## Key Components

### Core Pages
1. **Home** (`/`) - Hero section with 3D particle background and call-to-action
2. **Shop** (`/shop`) - Product catalog with grid layout
3. **Product Detail** (`/product/:id`) - Individual product page with 3D product viewer
4. **Shows** (`/shows`) - Upcoming comedy shows listing
5. **Show Detail** (`/show/:id`) - Individual show page with countdown timer
6. **Cart** (`/cart`) - Shopping cart with quantity management
7. **Checkout** (`/checkout`) - Order processing with 3D confetti success animation
8. **About** (`/about`) - Zakir Khan biography and achievements
9. **404** (`*`) - Custom not found page with Zakir's humor

### UI Components
- **Layout**: Header with navigation and cart counter, footer with social links
- **ThreeBackground**: Animated particle system using React Three Fiber
- **Product3D**: Interactive 3D product viewer with orbit controls
- **CustomCursor**: Enhanced cursor with hover effects
- **Animation Hooks**: useInView for scroll-triggered fade-ins

### Design System
- **Color Scheme**: Orange primary (#FF6B35), accent orange (#F7931E), dark secondary
- **Typography**: Inter for body text, Poppins for headings
- **Components**: shadcn/ui component library with custom theming
- **Responsive**: Mobile-first design with breakpoint-based layouts

## Data Flow

### Client-Server Communication
1. **API Requests**: TanStack Query handles caching, loading states, and error handling
2. **Session Management**: Cart items tied to session ID for guest checkout
3. **Real-time Updates**: Query invalidation ensures UI consistency after mutations

### State Management
- **Server State**: Products, shows, cart items managed by TanStack Query
- **Local State**: Form inputs, UI interactions, animation states via React hooks
- **Global State**: Cart count, mobile menu state managed at layout level

### Database Schema
- **Products**: ID, name, description, price, image, category, sizes, stock status
- **Shows**: ID, title, city, venue, date, time, price, capacity, ticket availability
- **Cart Items**: ID, product ID, quantity, size, session ID
- **Orders**: ID, session ID, total, status, shipping address, payment details

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Libraries**: Radix UI primitives, Lucide React icons, Class Variance Authority
- **3D Graphics**: @react-three/fiber, @react-three/drei, Three.js
- **Data Fetching**: TanStack React Query
- **Styling**: Tailwind CSS, clsx for conditional classes
- **Forms**: React Hook Form with Zod validation
- **Utilities**: date-fns for date formatting

### Backend Dependencies
- **Server**: Express.js, cors, helmet for security
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL session store
- **Build**: esbuild for server bundling, tsx for development

### Development Tools
- **TypeScript**: Full type safety across client and server
- **Vite**: Fast HMR, plugin ecosystem for React and TypeScript
- **Drizzle Kit**: Database migrations and schema management
- **PostCSS**: Tailwind CSS processing and autoprefixer

## Deployment Strategy

### Build Process
1. **Client Build**: Vite bundles React app to `dist/public`
2. **Server Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: Local PostgreSQL with environment variables
- **Production**: Neon Database with connection pooling
- **Session Storage**: PostgreSQL-backed sessions in production

### Hosting Requirements
- **Node.js**: Runtime environment for Express server
- **PostgreSQL**: Database for persistent data storage
- **Static Assets**: Served by Express in production
- **Environment Variables**: DATABASE_URL, session secrets

### Performance Optimizations
- **Code Splitting**: Vite automatically splits bundles for optimal loading
- **Image Optimization**: Optimized images for merchandise and show listings
- **Caching**: TanStack Query provides intelligent client-side caching
- **3D Performance**: Optimized Three.js scenes with efficient rendering

The application is designed for scalability with clear separation of concerns, type safety throughout, and modern development practices. The architecture supports easy feature additions and maintains performance through optimized bundling and caching strategies.