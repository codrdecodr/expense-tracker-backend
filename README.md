
# MERN Expense Tracker – Backend

This repository contains the backend API for the MERN Expense Tracker application.

## Overview

Built with **Node.js**, **Express**, and **MongoDB**, this backend handles user authentication, expense management, and data storage for the MERN Expense Tracker frontend.

## Features

- User signup and login with JWT authentication
- Create, read, update, and delete expenses
- Validation for expense data
- Secure routes with authentication middleware

## Setup & Run

1. Clone the repo:
```

git clone [https://github.com/codrdecodr/expense-tracker-backend.git](https://github.com/codrdecodr/expense-tracker-backend.git)

```
2. Install dependencies:
```

npm install

```
3. Create a `.env` file in the root folder with the following environment variables:
```

MONGO\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_jwt\_secret\_key
PORT=5000

```
4. Start the server:
```

npm start

```
5. The backend API will be running at `http://localhost:5000`.

## API Endpoints

- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login user
- `GET /api/expenses` – Get user expenses (authenticated)
- `POST /api/expenses` – Add new expense (authenticated)
- `PUT /api/expenses/:id` – Update expense (authenticated)
- `DELETE /api/expenses/:id` – Delete expense (authenticated)

## Tech Stack

- Node.js
- Express
- MongoDB & Mongoose
- JWT for authentication
- Middleware for validation and auth


