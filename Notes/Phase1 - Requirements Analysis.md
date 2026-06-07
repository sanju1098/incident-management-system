# Phase 0.1 - Requirements Analysis

Before writing code, let's define exactly what we're building.

## Business Problem

Organizations often struggle with:

- Tracking incidents across teams
- Assigning ownership
- Monitoring incident progress
- Maintaining audit trails
- Measuring resolution performance

Examples:

- API outage
- Database downtime
- Payment gateway failure
- Server crash
- Authentication service failure

Our platform allows teams to:

1. Report incidents
2. Assign responsible teams
3. Collaborate through comments
4. Track status changes
5. View timelines
6. Receive notifications
7. Analyze performance metrics

---

# Core Modules

## Authentication Module

Responsible for:

- Register
- Login
- Logout
- Refresh Token
- Password Reset

---

## User Module

Responsible for:

- Profile Management
- User Listing
- Role Management
- Activation / Deactivation

---

## Team Module

Responsible for:

- Team Creation
- Team Membership
- Team Assignment

Example:

```text
Backend Team
Frontend Team
DevOps Team
Security Team
```

---

## Incident Module

This is the heart of the application.

Example Incident:

```json
{
  "title": "Payment API Down",
  "severity": "Critical",
  "status": "Investigating",
  "serviceAffected": "Payment Service"
}
```

Lifecycle:

```text
Open
↓
Investigating
↓
Identified
↓
Monitoring
↓
Resolved
```

---

## Comments Module

Example:

```text
Developer:
Root cause identified.

Manager:
Deploying hotfix.

Developer:
Issue resolved.
```

---

## Timeline Module

Automatically records:

```text
John created incident
John changed severity
Sarah added comment
Mike resolved incident
```

Nothing is manually created.

Everything is system-generated.

---

## Notification Module

Examples:

```text
Incident assigned to you

Severity changed to Critical

You were mentioned in a comment
```

---

## Analytics Module

Dashboard metrics:

```text
Total Incidents

Open Incidents

Resolved Incidents

Average Resolution Time

Most Affected Services
```

---

# User Roles

We have 4 roles.

## Admin

Can do everything.

```text
Manage Users
Manage Teams
Manage Incidents
View Analytics
```

---

## Manager

Can:

```text
Create Teams
Assign Incidents
Manage Incidents
View Analytics
```

Cannot:

```text
Manage Users
```

---

## Developer

Can:

```text
View Assigned Incidents
Update Status
Add Comments
```

---

## Viewer

Can:

```text
View Incidents
View Analytics
```

Cannot modify anything.

---

# Database Design

We will have 7 collections.

---

## Users Collection

```js
{
  (_id, name, email, password, role, avatar, isActive, createdAt, updatedAt);
}
```

---

## Teams Collection

```js
{
  _id,
  name,
  description,
  members: [],
  createdBy
}
```

---

## Incidents Collection

```js
{
  _id,
  title,
  description,
  severity,
  status,
  serviceAffected,

  assignedTeam,
  assignee,

  tags: [],

  attachments: [],

  createdBy,

  resolvedAt,

  createdAt,
  updatedAt
}
```

---

## Comments Collection

```js
{
  _id,
  incidentId,
  userId,
  message,
  mentions: []
}
```

---

## AuditLogs Collection

```js
{
  (_id, incidentId, actor, action, previousValue, newValue, timestamp);
}
```

---

## Notifications Collection

```js
{
  (_id, recipient, type, message, isRead);
}
```

---

## RefreshTokens Collection

```js
{
  (_id, userId, token, expiresAt);
}
```

---

# Relationships

```text
User
 │
 ├── belongs to many Teams
 │
 ├── creates many Incidents
 │
 └── writes many Comments


Team
 │
 └── assigned many Incidents


Incident
 │
 ├── has many Comments
 │
 ├── has many Audit Logs
 │
 └── belongs to Team


Notification
 │
 └── belongs to User
```

---

# API Versioning Strategy

Every endpoint starts with:

```text
/api/v1
```

Example:

```text
/api/v1/auth/login

/api/v1/users

/api/v1/incidents
```

Future:

```text
/api/v2
```

without breaking clients.

---

# Standard Response Format

Success:

```json
{
  "success": true,
  "message": "Incident created successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": []
}
```

---

# Next Step

### Phase 1.1 - Project Initialization

In the next step we'll:

1. Create project
2. Install all dependencies
3. Create folder structure
4. Configure environment variables
5. Create Express server
6. Connect MongoDB

After that you'll have a running backend server ready for development.
