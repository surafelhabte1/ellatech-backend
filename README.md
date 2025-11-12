# 🧩 NestJS REST API – Users, Products & Transactions

A scalable REST API built using **NestJS**, **TypeORM**, and **PostgreSQL** with reusable base service and controller patterns for clean and maintainable code.

---

## 🚀 Setup & Installation

## 1️⃣ Clone and Install Dependencies

```bash

git clone https://github.com/surafelhabte1/ellatech-backend.git
cd ellatech
npm install

```
## 🧩 How the system organized

```bash

BaseController & BaseService Explained

To avoid repeating CRUD logic (create, read, update, delete) across multiple modules, this project defines two reusable abstract classes:
BaseService and BaseController.

BaseController
BaseController defines standard REST API endpoints that use the service methods.

BaseService
BaseService is a generic service that handles common database operations for any entity.

What it does:

- Provides default CRUD methods (create, findAll, findOne, update, remove)

- Works with any entity by injecting the TypeORM repository

- Reduces duplicate code in services like ProductsService, UsersService, etc.

What it does:

- Handles all CRUD endpoints automatically.

- Returns consistent API responses with statusCode, message, and data.

- Reduces repetitive controller code across modules.

Extending & Overriding

When you create a new module (e.g., ProductsController), you simply extend the BaseController and pass the right DTOs and service and add the function name specific to the controller and service

```

## 📚 API Endpoints

```bash

Users

| Method   | Endpoint     | Description               |
| -------- | ------------ | ------------------------- |
| `POST`   | `/users`     | Create a new user         |
| `GET`    | `/users`     | Get all users             |
| `GET`    | `/users/:id` | Get a specific user by ID |
| `PUT`    | `/users/:id` | Update user info          |
| `DELETE` | `/users/:id` | Delete a user             |

Request Example

POST /users
{
  "name": "John Doe",
  "email": "john@example.com"
}

```

```bash

Products

| Method   | Endpoint                      | Description                   |
| -------- | ----------------------------- | ----------------------------- |
| `POST`   | `/products`                   | Create a new product          |
| `GET`    | `/products`                   | List all products             |
| `GET`    | `/products/:id`               | Get a product by ID           |
| `GET`    | `/products/status/:productId` | Get a product’s status        |
| `PUT`    | `/products/adjust/:productId` | Update or adjust product info |
| `DELETE` | `/products/:id`               | Delete a product              |

Request Example

POST /products
{
  "title": "Laptop",
  "price": 1200,
  "status": "available"
}

```

```bash

Transactions

| Method   | Endpoint            | Description                            |
| -------- | ------------------- | -------------------------------------- |
| `POST`   | `/transactions`     | Create a transaction (purchase record) |
| `GET`    | `/transactions`     | Get all transactions                   |
| `GET`    | `/transactions/:id` | Get a transaction by ID                |
| `DELETE` | `/transactions/:id` | Delete a transaction record            |

Request Example

POST /transactions
{
  "userId": 1,
  "productId": 3,
  "quantity": 2
}

```

```bash

Example Response Format

Success

{
  "statusCode": 200,
  "message": "Success",
  "data": { ... }
}

Error

{
  "statusCode": 500,
  "message": "Error",
  "error": "Error message details"
}

```

## 🧩 Tech Stack

```bash
NestJS – Modular Node.js framework

TypeORM – ORM for PostgreSQL

PostgreSQL – Relational DB

Class-Validator – Validation layer for DTOs

TypeScript – Type-safe development

```

## 👨‍💻 Author

```bash
Surafe habte

Software Developer from Ethiopia 🇪🇹
Passionate about clean code, scalable systems, and backend excellence
```
