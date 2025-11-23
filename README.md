
# Quiz Management System API

A robust RESTful API backend designed for managing online quizzes, questions, and student attempts. Built with **TypeScript**, **Express**, and **Prisma ORM**, focusing on type safety, scalability, and clean architecture.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-v20+-green)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet)

## Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Database Schema](#-database-schema)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)

## Project Overview
This project serves as the backend for a Quiz Application. It allows **Teachers** (authenticated users) to create quizzes with multiple questions and options. **Students** (public users) can attempt these quizzes using a unique quiz code and receive instant scoring.

The project uses a **Service–Controller–Repository** architecture to maintain clean, scalable, and maintainable code.

## Tech Stack
- **Runtime:** Node.js  
- **Language:** TypeScript  
- **Framework:** Express.js  
- **Database:** MySQL / MariaDB  
- **ORM:** Prisma  
- **Validation:** Zod  
- **Authentication:** JWT & Bcrypt  
- **Logging:** Winston  

## Key Features

### Authentication & User Management
- Secure teacher registration and login  
- JWT authentication for private endpoints  
- Password hashing using Bcrypt  

### Quiz Management (Protected)
- Create, update, delete quizzes  
- Auto-generated `quizCode` for sharing  
- Add questions and multiple-choice options  
- Bulk option creation  

### Student Attempts (Public)
- Start quiz attempt using `quizCode`  
- Submit answers and auto-score  
- View attempt summary  

## Database Schema
Main tables:
- **User**
- **Quiz**
- **Question**
- **Option**
- **Attempt**
- **Answer**

## Project Structure

```

src/
├── application/      # App configuration
├── controller/       # REST controllers
├── service/          # Business logic
├── repository/       # Database queries (Prisma)
├── route/            # Route definitions
├── middleware/       # Auth, error handler
├── validation/       # Zod schemas
├── lib/              # Utils (Logger, JWT, Prisma client)
└── type/             # Type definitions

````

## Installation & Setup

### Prerequisites
- Node.js v18+  
- MySQL / MariaDB  

### Steps

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/john-quiz-backend.git
cd john-quiz-backend
````

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create environment variables

Create a `.env` file:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

DATABASE_HOST="localhost"
DATABASE_PORT="3306"
DATABASE_USER="root"
DATABASE_PASSWORD="password"
DATABASE_NAME="john_quiz_db"

JWT_SECRET="your_super_secret_key"
```

#### 4. Run Prisma migrations

```bash
npx prisma migrate dev --name init
```

#### 5. Start the server

```bash
npm start
```

Development mode:

```bash
npm run dev
```

Server runs on:
**[http://localhost:3000](http://localhost:3000)**



**Author:** Hidayat Sani

