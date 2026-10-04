# JobHub React Mini Project

JobHub is a responsive React job portal mini-project designed to demonstrate key React concepts and backend communication using Express.

## Project Objective
This project is built to satisfy the CIE-2 assignment requirements for:
- reusable components
- class and functional components
- parent-child data flow
- props and state management
- useEffect for API calls
- form handling and event handling
- client-side routing
- backend server interaction using Express

## Core Features
- User login and registration flow
- Job listing dashboard with search and filtering
- Job detail page for each listing
- Application form with resume upload selection
- My Applications page
- Responsive UI for desktop and mobile screens

## Extra Modifications Beyond the Basic Tutorial
- Resume upload selector for a realistic job application flow
- Category chips for quick filtering
- Branded landing dashboard with company highlights and stats
- Modern responsive job portal UI

## Assignment Concept Coverage
- Components: reusable UI sections such as Navbar, JobCard, WelcomeBanner, JobStatsComponent
- Class component: WelcomeBanner uses class syntax
- Functional Components: JobDashboard, Authentication, JobDetails, MyApplications
- Parent-child data binding: props passed from parent to child components
- useState: used for search, category, form data, and application state
- useEffect: used for fetching jobs and applications from the API
- Event handling: click, change, and submit handlers
- Form handling: login, register, and application forms
- Routing: React Router is used for /, /jobs, /jobs/:id, /applications
- Backend handling: Express server provides job and auth APIs on localhost:5000

## Tech Stack
- React
- Vite
- React Router
- Express
- JavaScript

## Run the Project
1. Start the backend server:
   cd server
   npm start

2. Start the frontend:
   cd ..
   npm run dev

3. Open the app in the browser at:
   http://localhost:5173
