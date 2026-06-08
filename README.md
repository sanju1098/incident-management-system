# Incident Management System API Documentation

## Base URL

```http
http://localhost:5000/api/v1
```

---

# Authentication

Authentication is handled using:

- JWT Access Token
- JWT Refresh Token
- HttpOnly Refresh Token Cookie

Protected routes require:

```http
Authorization: Bearer <access_token>
```

---

# Roles

| Role      | Description                         |
| --------- | ----------------------------------- |
| Admin     | Full system access                  |
| Manager   | Team and incident management        |
| Developer | Incident handling and collaboration |
| Viewer    | Read-only access                    |

---

# Access Control Matrix

| Endpoint            | Admin | Manager | Developer | Viewer |
| ------------------- | ----- | ------- | --------- | ------ |
| Register            | ✅    | ✅      | ✅        | ✅     |
| Login               | ✅    | ✅      | ✅        | ✅     |
| Refresh Token       | ✅    | ✅      | ✅        | ✅     |
| Logout              | ✅    | ✅      | ✅        | ✅     |
| Get Current User    | ✅    | ✅      | ✅        | ✅     |
| Get Profile         | ✅    | ✅      | ✅        | ✅     |
| Update Profile      | ✅    | ✅      | ✅        | ✅     |
| List Users          | ✅    | ❌      | ❌        | ❌     |
| Filter Users        | ✅    | ❌      | ❌        | ❌     |
| Activate User       | ✅    | ❌      | ❌        | ❌     |
| Deactivate User     | ✅    | ❌      | ❌        | ❌     |
| Create Team         | ✅    | ✅      | ❌        | ❌     |
| Update Team         | ✅    | ✅      | ❌        | ❌     |
| Delete Team         | ✅    | ❌      | ❌        | ❌     |
| Assign Team Members | ✅    | ✅      | ❌        | ❌     |
| View Teams          | ✅    | ✅      | ✅        | ✅     |
| View Team Details   | ✅    | ✅      | ✅        | ✅     |

---

# API Summary

## Authentication APIs

| Method | Endpoint              | Auth Required        |
| ------ | --------------------- | -------------------- |
| POST   | `/auth/register`      | ❌                   |
| POST   | `/auth/login`         | ❌                   |
| POST   | `/auth/refresh-token` | Refresh Token Cookie |
| POST   | `/auth/logout`        | Refresh Token Cookie |
| GET    | `/auth/me`            | ✅                   |

---

## User Management APIs

| Method | Endpoint                | Auth Required |
| ------ | ----------------------- | ------------- |
| GET    | `/users/profile`        | ✅            |
| PUT    | `/users/profile`        | ✅            |
| GET    | `/users`                | ✅            |
| GET    | `/users?role=Developer` | ✅            |
| PATCH  | `/users/:id/activate`   | ✅            |
| PATCH  | `/users/:id/deactivate` | ✅            |

---

## Team Management APIs

| Method | Endpoint             | Auth Required |
| ------ | -------------------- | ------------- |
| POST   | `/teams`             | ✅            |
| GET    | `/teams`             | ✅            |
| GET    | `/teams/:id`         | ✅            |
| PUT    | `/teams/:id`         | ✅            |
| DELETE | `/teams/:id`         | ✅            |
| PATCH  | `/teams/:id/members` | ✅            |

---

# Detailed API Reference

---

# 1. Register User

### Endpoint

```http
POST /auth/register
```

### Authentication

```text
Not Required
```

### Request Body

```json
{
  "name": "Sanjay Kumar",
  "email": "sanjay@gmail.com",
  "password": "Password@123",
  "role": "Developer"
}
```

### Success Response

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

# 2. Login

### Endpoint

```http
POST /auth/login
```

### Authentication

```text
Not Required
```

### Request Body

```json
{
  "email": "sanjay@gmail.com",
  "password": "Password@123"
}
```

### Success Response

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

# 3. Get Current User

### Endpoint

```http
GET /auth/me
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Authentication

```text
Required
```

### Success Response

```json
{
  "success": true,
  "message": "User profile fetched",
  "data": {
    "_id": "6654c1c",
    "name": "Sanjay Kumar",
    "email": "sanjay@gmail.com",
    "role": "Developer"
  }
}
```

---

# 4. Get Profile

### Endpoint

```http
GET /users/profile
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Authentication

```text
Required
```

### Success Response

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

# 5. Update Profile

### Endpoint

```http
PUT /users/profile
```

### Headers

```http
Authorization: Bearer <access_token>
```

### Request Body

```json
{
  "name": "Updated Name",
  "avatar": "https://example.com/avatar.png"
}
```

### Success Response

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
