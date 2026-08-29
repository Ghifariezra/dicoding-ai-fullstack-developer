# 📚 Bookshelf API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-ESM-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/ESLint-10.9.1-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/API-REST-informational" alt="REST API" />
</p>

<p align="center">
  A simple RESTful API for managing a bookshelf — create, read, update, delete, and filter books, built with Express and an in-memory data store.
</p>

---

## 📑 Table of Contents

- [📚 Bookshelf API](#-bookshelf-api)
  - [📑 Table of Contents](#-table-of-contents)
  - [🧰 Tech Stack](#-tech-stack)
  - [📂 Project Structure](#-project-structure)
  - [✅ Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
  - [🚀 Running the Server](#-running-the-server)
  - [🔌 API Endpoints](#-api-endpoints)
    - [Query Filters — `GET /books`](#query-filters--get-books)
    - [Example — Add a Book](#example--add-a-book)
  - [📖 Book Data Model](#-book-data-model)
  - [⚠️ Validation Rules](#️-validation-rules)
  - [🧹 Linting](#-linting)

---

## 🧰 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| 🟢 Express | `^5.2.1` | Web framework / routing |
| 🆔 nanoid | `^3.3.18` | Unique book ID generation |
| 🧹 ESLint | `^10.9.1` | Code linting |
| 🔁 nodemon | `^3.1.14` | Auto-restart during development |

## 📂 Project Structure

```
bookshelf-api/
├── src/
│   ├── books.js          # In-memory data store (array of books)
│   ├── handler.js        # Route handlers: add, get, update, delete
│   ├── routes.js         # Express router definitions
│   └── server.js         # App entry point (listens on port 9000)
├── eslint.config.js       # ESLint flat config
├── package.json
└── package-lock.json
```

## ✅ Prerequisites

- **Node.js** (LTS) installed

## 📥 Installation

```bash
npm install
```

## 🚀 Running the Server

```bash
# Production mode
npm start

# Development mode (auto-restart with nodemon)
npm run start-dev
```

Server runs at:

```
http://localhost:9000
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/books` | Add a new book |
| `GET` | `/books` | Get all books (supports query filters) |
| `GET` | `/books/:bookId` | Get book detail by ID |
| `PUT` | `/books/:bookId` | Update a book by ID |
| `DELETE` | `/books/:bookId` | Delete a book by ID |

### Query Filters — `GET /books`

| Query Param | Value | Effect |
|---|---|---|
| `name` | any string | Case-insensitive substring match on book name |
| `reading` | `0` or `1` | Filter by `reading` status |
| `finished` | `0` or `1` | Filter by `finished` status |

Example:

```
GET /books?reading=1&name=harry
```

### Example — Add a Book

```bash
curl -X POST http://localhost:9000/books \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Atomic Habits",
    "year": 2018,
    "author": "James Clear",
    "summary": "A guide to building good habits",
    "publisher": "Avery",
    "pageCount": 320,
    "readPage": 100,
    "reading": true
  }'
```

Response:

```json
{
  "status": "success",
  "message": "Buku berhasil ditambahkan",
  "data": {
    "bookId": "xI3wZtHDgh8_23a1"
  }
}
```

## 📖 Book Data Model

| Field | Type | Notes |
|---|---|---|
| `id` | string | Generated via `nanoid(16)` |
| `name` | string | **Required** |
| `year` | number | |
| `author` | string | |
| `summary` | string | |
| `publisher` | string | |
| `pageCount` | number | |
| `readPage` | number | Must not exceed `pageCount` |
| `finished` | boolean | Auto-computed: `pageCount === readPage` |
| `reading` | boolean | |
| `insertedAt` | string (ISO) | Set on creation |
| `updatedAt` | string (ISO) | Set on creation & update |

## ⚠️ Validation Rules

- **`POST /books`** / **`PUT /books/:bookId`**
  - `name` is required → `400` if missing: *"Gagal menambahkan/memperbarui buku. Mohon isi nama buku"*
  - `readPage` cannot exceed `pageCount` → `400`: *"...readPage tidak boleh lebih besar dari pageCount"*
- **`GET /books/:bookId`** / **`PUT /books/:bookId`** / **`DELETE /books/:bookId`**
  - Returns `404` with `status: "fail"` if `bookId` is not found

## 🧹 Linting

```bash
npm run lint
```

Config (`eslint.config.js`) targets ES modules with `latest` ECMAScript syntax, warns on unused variables, and allows `console` usage.