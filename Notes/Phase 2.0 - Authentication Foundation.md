# Phase 2.0 - Authentication Foundation

## What we'll build in this phase

# Authentication Architecture

```text
Auth Request
    │
    ▼
Route
    │
    ▼
Validation (Zod)
    │
    ▼
Controller
    │
    ▼
Service
    │
    ▼
Database
```

We'll follow:

```text
Route
  →
Controller
  →
Service
  →
Model
```

This keeps business logic out of controllers.

---
