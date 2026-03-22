# 🧠 Brain Dump: Full-Stack Memory API & Dashboard

**Brain Dump** is a professional MERN stack application designed to help developers offload daily thoughts, snippets, and tasks. By separating concerns into a modular **Node.js/Express** backend and a high-performance **React/Vite** frontend, it provides a scalable architecture for personal data management.

---

## 🏗️ Technical Architecture

The project is structured as a **Decoupled Monorepo**, ensuring that the client and server remain independent yet perfectly synced.



### 🔙 Backend (Node.js & Express)
* **Modular Routing**: Categorized endpoints via `express.Router()`.
* **ODM Layer**: **Mongoose** for schema validation and data integrity.
* **Security**: Implements **CORS** middleware to allow secure cross-origin communication.
* **RESTful logic**: Full **CRUD** (Create, Read, Update, Delete) capabilities.

### 🎨 Frontend (React + Vite)
* **Fast Refresh**: Powered by **Vite** for instantaneous development feedback.
* **Component-Based**: Modular UI built with functional components and React Hooks.
* **State Management**: Real-time synchronization with the MongoDB database.

---

## 📂 Project Structure

```text
BRAIN DUMP
├── 📂 backend
│   ├── 📂 middleware    # Custom security & traffic logging
│   ├── 📂 models        # Mongoose Schemas (Data Blueprints)
│   ├── 📂 routes        # API Endpoint logic
│   ├── index.js         # Server entry point
│   └── package.json     # Backend dependencies
│
├── 📂 frontend           # React Application (Vite)
│   ├── 📂 src           # Logic, Components, and Assets
│   ├── index.html       # Application entry point
│   └── package.json     # Frontend dependencies
│
└── README.md             # Global Project Documentation