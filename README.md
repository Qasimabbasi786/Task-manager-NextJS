# TaskFlow

Author: Muhammad Qasim

TaskFlow is a lightweight, user-friendly task management system built with Next.js and MongoDB. It provides a simple workflow to create, view, update, and complete tasks with authentication and a clean UI — ideal for personal productivity and small teams.

## Live link
https://qasim-task-manager.vercel.app/

<img width="1597" height="724" alt="image" src="https://github.com/user-attachments/assets/79b844f2-4dcf-48cd-9d03-48c3c286f357" />
<img width="1596" height="719" alt="image" src="https://github.com/user-attachments/assets/e8cd7b08-2a0a-4497-9ba8-992b2b53acc8" />
<img width="1598" height="724" alt="image" src="https://github.com/user-attachments/assets/31f7ab2f-50be-4ba0-ac26-372a411c28a6" />
<img width="1263" height="718" alt="image" src="https://github.com/user-attachments/assets/b94380fd-17cc-4389-8338-0a8e094ad085" />


## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Key Features
- Create, read, update, and delete tasks
- User authentication (signup, login, logout)
- Task status views (pending, completed)
- Task detail and edit modal
- RESTful API routes for tasks and auth

## Tech Stack
- Frontend: Next.js (App Router) + React + TypeScript
- Backend: Next.js API Routes
- Database: MongoDB via Mongoose
- Styling: CSS Modules / global CSS

## Getting Started
Prerequisites:

- Node.js (v16+ recommended)
- npm, pnpm, or yarn
- A running MongoDB instance (local or cloud)

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
npm install
# or: pnpm install | yarn
```

Create a `.env.local` file in the project root and add the required environment variables (see below).

Run the development server:

```bash
npm run dev
# then open http://localhost:3000
```

## Environment Variables
Create a `.env.local` file with the following variables (example):

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# OPTIONAL: NEXTAUTH_SECRET=your_random_secret
```

Ensure `MONGODB_URI` points to your MongoDB instance.

## Available Scripts
- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run linters (if configured)

## Project Structure

- `app/` — Next.js app routes and pages
- `src/components/` — React components (TaskCard, TaskModal, etc.)
- `src/lib/` — helpers (e.g., `dbConnect.ts`)
- `src/models/` — Mongoose models (`Task`, `User`)
- `src/app/api/` — API routes for auth and tasks

See the code for details and handler implementations.

## Contributing
Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit changes (`git commit -m "feat: add ..."`)
4. Open a pull request

Please open issues for bugs or feature requests.

## License
This project is provided under the MIT License. See the `LICENSE` file for details.

---

If you want, I can also:

- Add a sample `.env.local.example`
- Add badges, screenshots, or a demo GIF
- Tailor the README to include specific API examples from this codebase

Would you like me to add any of those? 
