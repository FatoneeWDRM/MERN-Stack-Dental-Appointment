# Healthcare Clinic Management System

## Overview
A comprehensive, full-stack Clinic Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application facilitates the management of patients, doctors, and appointments with Role-Based Access Control (RBAC).

**Role:** Full-Stack Developer  
**Status:** Completed  

## Features

### 🔐 Authentication & Authorization
- **JWT-based Auth**: Secure login and registration for Patients, Doctors, and Staff.
- **RBAC**: Middleware to protect routes and ensure only authorized roles can access specific data.
- **Password Hashing**: Uses `bcryptjs` for security.

### 🏥 Patient Management
- **Profile Management**: Patients can update their personal and medical details.
- **Appointment History**: View past and upcoming appointments.

### 👨‍⚕️ Doctor Management
- **Profile**: Doctors can set their specializations and consultation fees.
- **Availability**: View appointments scheduled for them.

### 📅 Appointment System
- **Booking Engine**: Prevents double-booking for doctors at the same time slot.
- **Status Workflow**: Track appointments from `Booked` -> `Confirmed` -> `Completed` -> `Cancelled`.

### 💻 Dashboard
- **Role-specific Views**:
  - **Patients**: Book appointments, update profile.
  - **Doctors**: View schedule.
  - **Staff/Admin**: Overview of system activity.

## Tech Stack
- **Frontend**: React (Vite), Context API, CSS Modules.
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
4. Start the server:
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
| GET | /api/doctors | List all doctors | Public |
| POST | /api/appointments | Book appointment | Patient |
| GET | /api/appointments | Get user appointments | Private |

## Future Improvements
- [ ] Email notifications for appointment confirmation.
- [ ] Admin panel for user management (Ban/Delete).
- [ ] File upload for medical reports.

## License
MIT
