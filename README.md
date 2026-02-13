# JKD Clinic Management System

## Overview
A comprehensive, full-stack Clinic Management System tailored for **JKD Clinic**, a leading Chiropractic and Physical Therapy center. Built with the MERN stack (MongoDB, Express, React, Node.js), this application facilitates the seamless management of patients, physical therapists, and appointment schedules, ensuring a premium healthcare experience.

**Role:** Full-Stack Developer  
**Status:** In Development / MVP Phase

## Key Features

### 🏥 Services & Rebranding
- **Specialized Care**: Tailored for Chiropractic (Bone Adjustment) and Physical Therapy (Office Syndrome, Sport Injury).
- **Premium UI**: Modern, clean interface with a "Medical Glassmorphism" design system.

### 🔐 Authentication & Security
- **Role-Based Access**: Dedicated login portals for **Patients** and **Doctors** with strict role verification.
- **Secure Auth**: JWT-based session management with protected routes.

### 💻 Dashboards
- **Patient Portal**:
  - View **Upcoming Appointments**.
  - Access **Medical History** and past treatments.
  - Quick access to **Booking** new sessions.
- **Doctor Dashboard**:
  - **Overview Stats**: Real-time view of total appointments, daily schedule, and pending requests.
  - **Appointment Management**: Approve, Cancel, or Mark appointments as Completed.
  - **Patient Management**: Access patient details and contact info.

### 📅 Appointment System
- **Real-time Availability**: Checks doctor schedules to prevent double-booking.
- **Status Workflow**: `Booked` (Pending) -> `Confirmed` -> `Completed` -> `Cancelled`.
- **Digital Slips**: Generates appointment confirmation details.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, React Router v6.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Tools**: Postman, Git, NPM.

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URL)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/clinic_db
   JWT_SECRET=your_super_secret_key
   ```
4. Seed the database (Optional - for demo data):
   ```bash
   node seed.cjs
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/appointments | Get appointments (Role specific) | Private |
| POST | /api/appointments | Book appointment | Patient |
| PUT | /api/appointments/:id | Update status (Confirm/Cancel) | Doctor |

## Future Improvements
- [ ] Line/Messenger Integration for customer support.
- [ ] Email notifications for appointment confirmation.
- [ ] File upload for X-Ray and medical reports.

## License
MIT
