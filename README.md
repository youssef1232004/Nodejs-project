# 🛒 Node.js RESTful API — E-Commerce Backend

A production-ready **RESTful API** built with **Node.js**, **Express 5**, and **MongoDB** following a clean **MVC architecture**. It features full **JWT-based authentication**, **role-based access control**, **Cloudinary image uploads**, and comprehensive **request validation** for managing users, products, and categories.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Reference](#-api-reference)
  - [Users](#users)
  - [Products](#products)
  - [Categories](#categories)
- [Data Models](#-data-models)
- [Architecture Overview](#-architecture-overview)
- [Authentication & Authorization](#-authentication--authorization)
- [Error Handling](#-error-handling)
- [License](#-license)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login and registration with token-based auth (1-day expiry)
- 🛡️ **Role-Based Access Control** — `admin` and `user` roles with granular permission guards
- 🖼️ **Cloudinary Image Uploads** — Direct cloud image storage for products via Multer
- ✅ **Request Validation** — Input validation using `express-validator` on all endpoints
- 🔢 **Pagination, Filtering & Sorting** — Flexible query support on product listings
- 🏗️ **Clean MVC Architecture** — Separated routes, controllers, services, models, and utilities
- ⚙️ **Centralized Error Handling** — Custom `AppError` class with consistent JSON error responses
- 📦 **Async Wrapper** — All async controllers are wrapped to eliminate repetitive try/catch blocks

---

## 🛠️ Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| Runtime      | Node.js                                       |
| Framework    | Express 5                                     |
| Database     | MongoDB (via Mongoose 9)                      |
| Auth         | JSON Web Tokens (`jsonwebtoken`)              |
| Passwords    | `bcrypt`                                      |
| File Upload  | Multer + Cloudinary (`multer-storage-cloudinary`) |
| Validation   | `express-validator`, `joi`                    |
| Dev Tool     | Node.js native `--watch` flag (no nodemon)    |

---

## 📁 Project Structure

```
├── server.js                   # Entry point — connects DB and starts server
└── src/
    ├── app.js                  # Express app setup, route registration, 404 handler
    ├── config/
    │   └── db.js               # MongoDB connection
    ├── models/
    │   ├── userModel.js        # User schema (name, email, password, role, address)
    │   ├── productModel.js     # Product schema (name, image, price, category, stock)
    │   └── categoryModel.js    # Category schema (name)
    ├── controllers/
    │   ├── user.controller.js      # User CRUD handlers
    │   ├── product.controller.js   # Product CRUD handlers
    │   └── category.controller.js  # Category CRUD handlers
    ├── services/
    │   ├── user.service.js         # User business logic (register, login, update, delete)
    │   ├── product.service.js      # Product business logic (pagination, filtering, sorting)
    │   └── category.service.js     # Category business logic
    ├── routes/
    │   ├── user.routes.js          # /users endpoints
    │   ├── product.routes.js       # /products endpoints
    │   └── category.routes.js      # /category endpoints
    ├── middlewares/
    │   ├── verifyToken.js          # JWT verification middleware
    │   ├── authHandler.js          # Role guards (isAdmin, isSameUserORisAdmin)
    │   ├── uploadImage.js          # Multer + Cloudinary storage config
    │   ├── validateHandler.js      # express-validator error aggregator
    │   └── errorHandler.js         # Global error handler middleware
    └── utils/
        ├── appError.js             # Custom AppError class
        ├── asyncWrapper.js         # Async error-catching HOF
        ├── generateToken.js        # JWT token generator (1-day expiry)
        ├── response.js             # Standardized JSON response helper
        └── validations/
            ├── userValidation.js       # User input validation rules
            ├── productValidations.js   # Product input validation rules
            └── categoryValidations.js  # Category input validation rules
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (uses the native `--watch` flag and `--env-file`)
- **MongoDB** — a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local instance)
- **Cloudinary** — a free account at [cloudinary.com](https://cloudinary.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Server
Port=3000

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET_KEY=your_super_secret_jwt_key
```

> ⚠️ **Never commit your `.env` file to version control.** Add it to `.gitignore`.

### Running the Server

```bash
# Development (with hot-reload via Node --watch)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

---

## 📡 API Reference

All responses follow a unified JSON structure:

```json
{
  "status": "success" | "fail",
  "message": "Descriptive message",
  "data": { ... }
}
```

> 🔒 Protected routes require the `Authorization: Bearer <token>` header.

---

### Users

**Base URL:** `/users`

| Method | Endpoint          | Auth Required | Role         | Description                      |
|--------|-------------------|:-------------:|:------------:|----------------------------------|
| `GET`  | `/`               | ✅            | Admin only   | Get all users                    |
| `POST` | `/register`       | ❌            | Public       | Register a new user              |
| `POST` | `/login`          | ❌            | Public       | Login and receive a JWT token    |
| `PUT`  | `/:userId`        | ✅            | Self or Admin| Update user profile              |
| `DELETE` | `/:userId`      | ✅            | Self or Admin| Delete a user account            |

#### POST `/users/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### POST `/users/login`
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "token": "<jwt_token>",
    "user": { ... }
  }
}
```

---

### Products

**Base URL:** `/products`

| Method   | Endpoint         | Auth Required | Role       | Description                            |
|----------|------------------|:-------------:|:----------:|----------------------------------------|
| `GET`    | `/`              | ❌            | Public     | Get all products (pagination/filter)   |
| `GET`    | `/:productId`    | ❌            | Public     | Get a single product by ID             |
| `POST`   | `/`              | ✅            | Admin only | Create a new product (with image)      |
| `PUT`    | `/:productId`    | ✅            | Admin only | Update a product (with optional image) |
| `DELETE` | `/:productId`    | ✅            | Admin only | Delete a product                       |

#### Query Parameters for `GET /products`

| Parameter  | Type     | Description                         |
|------------|----------|-------------------------------------|
| `page`     | `number` | Page number (default: `1`)          |
| `limit`    | `number` | Items per page (default: `10`)      |
| `category` | `string` | Filter by category ID               |
| `sort`     | `string` | Sort field (e.g., `price`, `-price`)|

#### POST `/products` — `multipart/form-data`

| Field        | Type     | Required | Description                   |
|--------------|----------|:--------:|-------------------------------|
| `name`       | `string` | ✅       | Product name                  |
| `price`      | `number` | ✅       | Price (min: 0)                |
| `categoryId` | `string` | ✅       | MongoDB ObjectId of category  |
| `stock`      | `number` | ✅       | Stock count (min: 0)          |
| `image`      | `file`   | ✅       | JPG, PNG, JPEG, or WebP       |

---

### Categories

**Base URL:** `/category`

| Method   | Endpoint           | Auth Required | Role       | Description              |
|----------|--------------------|:-------------:|:----------:|--------------------------|
| `GET`    | `/`                | ❌            | Public     | Get all categories       |
| `GET`    | `/:categoryId`     | ❌            | Public     | Get category by ID       |
| `POST`   | `/`                | ✅            | Admin only | Create a new category    |
| `PUT`    | `/:categoryId`     | ✅            | Admin only | Update a category        |
| `DELETE` | `/:categoryId`     | ✅            | Admin only | Delete a category        |

#### POST/PUT `/category`
```json
{
  "name": "Electronics"
}
```

---

## 🗄️ Data Models

### User
| Field         | Type     | Description                            |
|---------------|----------|----------------------------------------|
| `name`        | String   | Full name (required)                   |
| `email`       | String   | Unique email (required)                |
| `password`    | String   | Hashed password (hidden from queries)  |
| `role`        | String   | `user` or `admin` (default: `user`)    |
| `address`     | Object   | `governorate`, `city`, `neighborhood`, `street` |
| `createdAt`   | Date     | Auto-timestamp                         |
| `updatedAt`   | Date     | Auto-timestamp                         |

### Product
| Field        | Type       | Description                        |
|--------------|------------|------------------------------------|
| `name`       | String     | Product name (required)            |
| `image`      | String     | Cloudinary URL (required)          |
| `price`      | Number     | Price, min 0 (required)            |
| `categoryId` | ObjectId   | Reference to `Category` (required) |
| `stock`      | Number     | Stock count, min 0 (required)      |
| `createdAt`  | Date       | Auto-timestamp                     |
| `updatedAt`  | Date       | Auto-timestamp                     |

### Category
| Field       | Type   | Description              |
|-------------|--------|--------------------------|
| `name`      | String | Category name (required) |
| `createdAt` | Date   | Auto-timestamp           |
| `updatedAt` | Date   | Auto-timestamp           |

---

## 🏗️ Architecture Overview

The project follows a strict **3-layer MVC architecture**:

```
Request → Router → Middleware(s) → Controller → Service → Model → MongoDB
                                                                    ↓
Response ←──────────────────────────── Controller ← Service ← Data
```

- **Routes** — Define endpoints and chain middleware/validation
- **Middlewares** — Handle cross-cutting concerns (auth, validation, uploads)
- **Controllers** — Thin layer: extract request data, call service, send response
- **Services** — Contain all business logic and database interactions
- **Models** — Define MongoDB schema and data shape
- **Utils** — Shared helpers: `AppError`, `asyncWrapper`, `generateToken`, `sendResponse`

---

## 🔐 Authentication & Authorization

### Authentication Flow
1. User registers via `POST /users/register` — password is hashed with `bcrypt`
2. User logs in via `POST /users/login` — receives a **JWT** valid for **1 day**
3. Include the token in all protected requests:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### Authorization Guards

| Middleware            | Protection                                              |
|-----------------------|---------------------------------------------------------|
| `verifyToken`         | Validates JWT; attaches decoded user to `req.user`      |
| `isAdmin`             | Allows only users with `role === "admin"`               |
| `isSameUserORisAdmin` | Allows access if the user is the resource owner or admin|

> Non-admin users **cannot** modify their own `role` field, even when updating their own profile.

---

## ⚠️ Error Handling

All errors are handled through a centralized `errorHandler` middleware using a custom `AppError` class.

**Error Response Format:**
```json
{
  "status": "fail",
  "message": "Descriptive error message",
  "errors": [ ... ]
}
```

| HTTP Status | Scenario                                      |
|-------------|-----------------------------------------------|
| `400`       | Validation errors (missing/invalid fields)    |
| `401`       | Missing or no token provided                  |
| `403`       | Invalid token or insufficient permissions     |
| `404`       | Resource or route not found                   |
| `500`       | Internal server error                         |




