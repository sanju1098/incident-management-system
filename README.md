# Incident Management System API Documentation

## Overview

This Incident Management System is a backend API built with Node.js, Express, MongoDB, and Cloudinary.
It provides authentication, role-based authorization, user management, team management, and file upload support.

## Tech Stack

- Node.js with ES modules
- Express 5
- MongoDB / Mongoose
- JWT authentication with access and refresh tokens
- Cloudinary file uploads via `multer-storage-cloudinary`
- Validation using Zod
- Security via Helmet, rate limiting, CORS, cookie parsing

## Base URL

```http
http://localhost:5000/api/v1
```

## Environment Variables

Create a `.env` file with the following values:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
NODE_ENV=development
```

## Getting Started

```bash
npm install
npm run dev
```

## Authentication

Authentication uses:

- JWT access token in `Authorization` header
- JWT refresh token stored as an HttpOnly cookie

Protected requests require:

```http
Authorization: Bearer <access_token>
```

## Roles

| Role      | Description                         |
| --------- | ----------------------------------- |
| Admin     | Full system access                  |
| Manager   | Team and incident management        |
| Developer | Incident handling and collaboration |
| Viewer    | Read-only access                    |

## Access Control

| Endpoint                      | Admin | Manager | Developer | Viewer |
| ----------------------------- | ----- | ------- | --------- | ------ |
| `POST /auth/register`         | ✅    | ✅      | ✅        | ✅     |
| `POST /auth/login`            | ✅    | ✅      | ✅        | ✅     |
| `POST /auth/refresh-token`    | ✅    | ✅      | ✅        | ✅     |
| `POST /auth/logout`           | ✅    | ✅      | ✅        | ✅     |
| `GET /auth/profile`           | ✅    | ✅      | ✅        | ✅     |
| `GET /users/profile`          | ✅    | ✅      | ✅        | ✅     |
| `PUT /users/profile`          | ✅    | ✅      | ✅        | ✅     |
| `GET /users`                  | ✅    | ❌      | ❌        | ❌     |
| `PATCH /users/:id/activate`   | ✅    | ❌      | ❌        | ❌     |
| `PATCH /users/:id/deactivate` | ✅    | ❌      | ❌        | ❌     |
| `POST /teams`                 | ✅    | ✅      | ❌        | ❌     |
| `GET /teams`                  | ✅    | ✅      | ✅        | ✅     |
| `GET /teams/:id`              | ✅    | ✅      | ✅        | ✅     |
| `PUT /teams/:id`              | ✅    | ✅      | ❌        | ❌     |
| `DELETE /teams/:id`           | ✅    | ❌      | ❌        | ❌     |
| `PATCH /teams/:id/members`    | ✅    | ✅      | ❌        | ❌     |
| `POST /uploads/single`        | ✅    | ✅      | ✅        | ✅     |
| `POST /uploads/multiple`      | ✅    | ✅      | ✅        | ✅     |

## API Summary

### Authentication APIs

| Method | Endpoint              | Auth Required                |
| ------ | --------------------- | ---------------------------- |
| POST   | `/auth/register`      | No                           |
| POST   | `/auth/login`         | No                           |
| GET    | `/auth/profile`       | Yes                          |
| POST   | `/auth/refresh-token` | Refresh token cookie or body |
| POST   | `/auth/logout`        | Refresh token cookie or body |

### User Management APIs

| Method | Endpoint                | Auth Required   |
| ------ | ----------------------- | --------------- |
| GET    | `/users/profile`        | Yes             |
| PUT    | `/users/profile`        | Yes             |
| GET    | `/users`                | Yes, Admin only |
| PATCH  | `/users/:id/activate`   | Yes, Admin only |
| PATCH  | `/users/:id/deactivate` | Yes, Admin only |

### Team Management APIs

| Method | Endpoint             | Auth Required      |
| ------ | -------------------- | ------------------ |
| POST   | `/teams`             | Yes, Admin/Manager |
| GET    | `/teams`             | Yes                |
| GET    | `/teams/:id`         | Yes                |
| PUT    | `/teams/:id`         | Yes, Admin/Manager |
| DELETE | `/teams/:id`         | Yes, Admin only    |
| PATCH  | `/teams/:id/members` | Yes, Admin/Manager |

### File Upload APIs

| Method | Endpoint            | Auth Required |
| ------ | ------------------- | ------------- |
| POST   | `/uploads/single`   | Yes           |
| POST   | `/uploads/multiple` | Yes           |

## Detailed Endpoints

### 1. Register User

**Endpoint**: `POST /auth/register`

**Auth**: not required

**Body**:

```json
{
  "name": "Sanjay Kumar",
  "email": "sanjay@gmail.com",
  "password": "Password@123",
  "role": "Developer"
}
```

**Success**:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "6654c1c",
    "name": "Sanjay Kumar",
    "email": "sanjay@gmail.com",
    "role": "Developer"
  }
}
```

---

### 2. Login

**Endpoint**: `POST /auth/login`

**Auth**: not required

**Body**:

```json
{
  "email": "sanjay@gmail.com",
  "password": "Password@123"
}
```

**Success**:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "6654c1c",
      "name": "Sanjay Kumar",
      "email": "sanjay@gmail.com",
      "role": "Developer"
    },
    "accessToken": "jwt_access_token"
  }
}
```

---

### 3. Get Auth Profile

**Endpoint**: `GET /auth/profile`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Success**:

```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "6654c1c",
    "name": "Sanjay Kumar",
    "email": "sanjay@gmail.com",
    "role": "Developer"
  }
}
```

---

### 4. Refresh Token

**Endpoint**: `POST /auth/refresh-token`

**Auth**: uses refresh token cookie or body `refreshToken`

**Success**:

```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

---

### 5. Logout

**Endpoint**: `POST /auth/logout`

**Auth**: uses refresh token cookie or body `refreshToken`

**Success**:

```json
{
  "success": true,
  "message": "Logout successful",
  "data": "User logged out successfully"
}
```

---

### 6. Get Profile

**Endpoint**: `GET /users/profile`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Success**:

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "6654c1c",
    "name": "Sanjay Kumar",
    "email": "sanjay@gmail.com",
    "role": "Developer"
  }
}
```

---

### 7. Update Profile

**Endpoint**: `PUT /users/profile`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Body**:

```json
{
  "name": "Updated Name",
  "avatar": "https://example.com/avatar.png"
}
```

**Success**:

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "6654c1c",
    "name": "Updated Name"
  }
}
```

---

### 8. List Users (Admin)

**Endpoint**: `GET /users`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Success**:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [ ... ]
}
```

---

### 9. Activate User (Admin)

**Endpoint**: `PATCH /users/:id/activate`

**Headers**:

```http
Authorization: Bearer <access_token>
```

---

### 10. Deactivate User (Admin)

**Endpoint**: `PATCH /users/:id/deactivate`

**Headers**:

```http
Authorization: Bearer <access_token>
```

---

### 11. Create Team

**Endpoint**: `POST /teams`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Body**:

```json
{
  "name": "Support Team",
  "description": "Handles incident response"
}
```

---

### 12. Get Teams

**Endpoint**: `GET /teams`

**Headers**:

```http
Authorization: Bearer <access_token>
```

---

### 13. Get Team Details

**Endpoint**: `GET /teams/:id`

**Headers**:

```http
Authorization: Bearer <access_token>
```

---

### 14. Update Team

**Endpoint**: `PUT /teams/:id`

**Headers**:

```http
Authorization: Bearer <access_token>
```

---

### 15. Delete Team

**Endpoint**: `DELETE /teams/:id`

**Headers**:

```http
Authorization: Bearer <access_token>
```

---

### 16. Assign Members

**Endpoint**: `PATCH /teams/:id/members`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Body**:

```json
{
  "memberIds": ["userId1", "userId2"]
}
```

---

### 17. Upload Single File

**Endpoint**: `POST /uploads/single`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Form Data**:

- `file`: file upload field

**Supported file types**:

- `image/png`
- `image/jpeg`
- `image/jpg`
- `application/pdf`
- `text/plain`

**Success**:

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "..."
  }
}
```

---

### 18. Upload Multiple Files

**Endpoint**: `POST /uploads/multiple`

**Headers**:

```http
Authorization: Bearer <access_token>
```

**Form Data**:

- `files`: array of files, up to 10 files

---

## Notes

- File uploads are stored in Cloudinary under the `incident-management` folder.
- User profile updates and team management are protected by authenticated routes.
- Admin-only actions include listing users, activating/deactivating users, and deleting teams.

---

## Project Status

Implemented modules:

- Authentication with register/login/refresh/logout
- User profile read/update
- Admin user management
- Team creation, retrieval, update, delete, assignment
- Cloudinary-based file upload support

Pending / next work:

- Delete file API support for uploads
- Incident, comment, notification modules
- More detailed API documentation for each module if new endpoints are added

---

# 6. List Users

### Endpoint

```http
GET /users?page=1&limit=10
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Access

```text
Admin Only
```

### Success Response

```json
{
  "success": true,
  "data": {
    "users": [],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

---

# 7. Create Team

### Endpoint

```http
POST /teams
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Access

```text
Admin, Manager
```

### Request Body

```json
{
  "name": "Backend Team",
  "description": "Handles backend services"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "_id": "teamId",
    "name": "Backend Team"
  }
}
```

---

# 8. Get Teams

### Endpoint

```http
GET /teams
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Access

```text
All Authenticated Users
```

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "teamId",
      "name": "Backend Team",
      "description": "Handles backend services"
    }
  ]
}
```

---

# 9. Update Team

### Endpoint

```http
PUT /teams/:id
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Access

```text
Admin, Manager
```

### Request Body

```json
{
  "name": "Platform Team",
  "description": "Updated Description"
}
```

---

# 10. Delete Team

### Endpoint

```http
DELETE /teams/:id
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Access

```text
Admin Only
```

---

# 11. Assign Team Members

### Endpoint

```http
PATCH /teams/:id/members
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Access

```text
Admin, Manager
```

### Request Body

```json
{
  "memberIds": ["userId1", "userId2", "userId3"]
}
```

### Success Response

```json
{
  "success": true,
  "message": "Members assigned successfully",
  "data": {
    "teamId": "123",
    "members": []
  }
}
```

---

# Standard Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```
