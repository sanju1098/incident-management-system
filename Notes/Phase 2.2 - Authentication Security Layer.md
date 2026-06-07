# Phase 2.2 - Authentication Security Layer

---

# Step 1 - Create Auth Middleware

Create:

```text
src/middleware/auth.middleware.js
```

---

## Purpose

This middleware:

1. Reads JWT token
2. Verifies token
3. Loads user from DB
4. Attaches user to request

After middleware:

```js
req.user;
```

will be available everywhere.

---

## auth.middleware.js

# Step 2 - Authenticated User Service

# Step 3 - Current User Controller

# Step 4 - Current User Route

# Step 5 - Refresh Token Service

# Step 6 - Refresh Token Controller

Add import:

```js
import { refreshUserToken } from "./auth.service.js";
```

---

Add:

```js
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  const accessToken = await refreshUserToken(token);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      HTTP_STATUS.OK,
      {
        accessToken,
      },
      "Token refreshed",
    ),
  );
});
```

---

# Step 7 - Refresh Route

# Step 8 - Cookie-Based Refresh Token

Currently login returns refresh token in JSON.

We want:

```text
Access Token
→ Response Body

Refresh Token
→ HttpOnly Cookie
```

More secure.

---

Open:

```text
auth.controller.js
```

Modify login:

```js
res.cookie("refreshToken", data.refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",

  sameSite: "strict",

  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

Before:

```js
return res.status(...)
```

---

# Step 9 - Logout Service

Open:

```text
auth.service.js
```

Add:

```js
export const logoutUser = async (token) => {
  await RefreshToken.deleteOne({
    token,
  });

  return true;
};
```

---

# Step 10 - Logout Controller

# Step 11 - Logout Route

```js
router.post("/logout", logout);
```

Import logout controller.

---

# Final Routes

```js
POST / register;

POST / login;

POST / refresh - token;

POST / logout;

GET / me;
```

---
