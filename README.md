# 🧠 Brain Dump: A Personal Memory API & Dashboard

**Brain Dump** is a full-stack MERN application designed to help developers and students offload their daily thoughts, code snippets, and tasks into a structured, searchable database. It moves beyond simple note-taking by providing a modular, scalable backend and a clean, responsive interface.

---

## 🏗️ Technical Architecture

The project follows a **Modular Monolith** pattern, separating concerns into distinct layers to ensure the code remains maintainable as the feature set grows.



### 🔙 Backend (Node.js & Express)
* **Modular Routing**: Uses `express.Router()` to categorize endpoints (e.g., `/api/notes`).
* **Custom Middleware**: Implements a global `logger` for traffic analysis and a `json` parser for payload handling.
* **ODM Layer**: **Mongoose** provides schema validation, ensuring data integrity before it hits the database.
* **Error Handling**: Centralized `try...catch` logic with standardized REST status codes.

### 💾 Database (MongoDB)
* **NoSQL Flexibility**: Stores notes as JSON-like documents.
* **Automatic Indexing**: Every "dump" is assigned a unique `_id` and `timestamp` automatically.

---

## 📂 Project Structure

```text
├── middleware/       # Custom security & traffic logging
├── models/           # Mongoose Blueprints (Schemas)
├── routes/           # API Endpoint logic & controllers
├── .gitignore        # Keeps node_modules out of the cloud
├── index.js          # Entry point (The Server "Switchboard")
├── package.json      # Dependencies (Express, Mongoose, Nodemon)
└── README.md         # Project documentation