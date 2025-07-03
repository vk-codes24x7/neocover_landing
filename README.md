# NeoCover - AI Job Assistant

A modern AI Job Assistant SaaS landing page built with Next.js, shadcn/ui, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with dark/light mode
- 🔒 Secure server-side API routes for database operations
- 📝 Waitlist form with email and LinkedIn validation
- 🌙 Dark/light theme toggle
- 📱 Mobile-optimized interface
- ⚡ Fast performance with Next.js 14

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account and project

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase Service Role Key (for server-side operations only)
# This should NEVER be exposed to the client
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Database Setup

1. Create a `waitlist` table in your Supabase database with the following schema:

```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  linkedin_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

2. Enable Row Level Security (RLS) and add policies:

```sql
-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for waitlist signups)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Allow anonymous selects (for duplicate checking)
CREATE POLICY "Allow anonymous selects" ON waitlist
  FOR SELECT USING (true);
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

### Security Features

- **Server-side API routes**: All database operations use secure API routes that run on the server
- **Service key protection**: Supabase service key is only used server-side and never exposed to the client
- **Input validation**: Comprehensive validation on both client and server side
- **Error handling**: Proper error handling with user-friendly messages

### API Routes

- `/api/waitlist/check-email` - Check if email already exists
- `/api/waitlist/add` - Add new entry to waitlist

### File Structure

```
src/
├── app/
│   ├── api/waitlist/     # Secure API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Navigation bar
│   ├── theme-provider.tsx # Theme context
│   ├── theme-toggle.tsx  # Theme toggle
│   └── waitlist-form.tsx # Waitlist form
└── lib/
    ├── api.ts            # Client-side API service
    ├── constants.ts      # App constants
    ├── hooks.ts          # Custom hooks
    ├── services.ts       # Service layer (deprecated)
    ├── supabase.ts       # Supabase client
    ├── utils.ts          # Utility functions
    └── validation.ts     # Validation functions
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## Production Deployment

### Environment Variables

Make sure all required environment variables are set in your production environment:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Build and Deploy

```bash
# Production build with type checking and linting
npm run build:prod

# Start production server
npm run start:prod
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Security Checklist

- [ ] Environment variables are properly set
- [ ] Supabase RLS policies are configured
- [ ] Rate limiting is enabled
- [ ] Security headers are in place
- [ ] Error boundaries are active
- [ ] Input validation is working
- [ ] Logging is configured for production
