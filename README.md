# Doctory - Healthcare Booking Platform

Doctory is a bilingual (Arabic, English) digital healthcare platform enabling seamless appointment booking between Patients and licensed Doctors. This project is built with Next.js 14+ (App Router), Supabase for authentication, database, and storage.

## Features

- **Bilingual Support**: Full English and Arabic language support with RTL layout
- **Theme Toggle**: Switch between Innovayt, Dark, and Light themes
- **Authentication**: Email/password authentication with Supabase
- **Doctor Search**: Find doctors by name and specialty
- **Appointment Booking**: Request appointments with doctors
- **Appointment Management**: View, cancel, and reschedule appointments
- **Medical Files**: Upload and download medical files
- **Responsive Design**: Mobile-first approach for all devices

## Project Structure

The project follows a feature-based folder structure:

```
/src
  /app - Next.js App Router pages
    /patients - Patient-specific pages
    /doctors - Doctor-specific pages
    /appointments - Appointment-related pages
    /shared - Shared components and utilities
    /auth - Authentication-related pages
  /components - React components
    /ui - Base UI components
    /patients - Patient-specific components
    /doctors - Doctor-specific components
    /appointments - Appointment-related components
    /shared - Shared components
    /auth - Authentication components
  /lib - Shared utilities and hooks
  /types - TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Supabase URL and anon key:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Set up Supabase tables:
   - Create the following tables in your Supabase project:
     - users
     - doctors
     - patients
     - appointments
     - availability
     - medical_files

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The project is configured for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

## Technologies Used

- **Frontend**: Next.js 14+, React 18, TypeScript, Tailwind CSS
- **State Management**: React Context for global state
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage for medical files
- **Styling**: Tailwind CSS with custom theming
- **Deployment**: Vercel

## Future Enhancements

- OAuth integration for social login
- Telemedicine features (video/audio)
- Insurance and billing integration
- Full EHR/EMR support
