Excellent. We'll use **ES Modules (`"type": "module"`)** from Day 1 and build it in a way that's aligned with modern Node.js projects.

# Phase 1.1 - Project Initialization

## Step 1 - Create Project

```bash
mkdir incidentmanagementsystem
cd incidentmanagementsystem

npm init -y
```

---

## Step 2 - Update package.json

Replace generated package.json with:

```json
{
  "name": "incident-management-system",
  "version": "1.0.0",
  "description": "Real Time Incident Management System",
  "type": "module",
  // "type": "commonjs"
  // Instead of CommonJS, we will use ES Modules for better syntax and modern features.
  // Note: If you want to use CommonJS, remove this line and use require() instead of import.
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

---

# Step 3 - Install Production Dependencies

## Core Dependencies

```bash
npm install express mongoose dotenv
```

---

## Authentication

```bash
npm install jsonwebtoken bcryptjs
```

---

## Security

```bash
npm install helmet cors express-rate-limit
```

---

## Validation

```bash
npm install zod
```

---

## File Upload

```bash
npm install multer cloudinary
```

---

## Logging

```bash
npm install morgan
```

---

## Swagger

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

## Cookie Support

```bash
npm install cookie-parser
```

---

## Utilities

```bash
npm install nanoid
```

---

## Redis

```bash
npm install redis
```

---

# Step 4 - Install Development Dependencies

```bash
npm install -D nodemon
```

Later we'll add:

```bash
npm install -D jest supertest
```

for testing.

---
