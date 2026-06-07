# authaction-nextjs-example

This is a Next.js application demonstrating how to integrate OAuth2 authentication using [AuthAction](https://authaction.com/) with the `@authaction/web-sdk` library.

## Overview

This application showcases:

- OAuth2 login flow using `@authaction/web-sdk/nextjs`.
- Wrapping the app with `AuthActionNextProvider` for global auth state.
- Protected route example (`/dashboard`) that shows authenticated content.
- Logout handling with AuthAction's redirect flow.
- Handling the OAuth2 callback with `handleRedirectCallback`.

## Prerequisites

Before running this application, ensure you have:

1. **Node.js and npm installed**: [Download from nodejs.org](https://nodejs.org/)
2. **AuthAction OAuth2 credentials**:
   - Tenant Domain
   - Client ID
   - Redirect URIs (login callback and logout)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/authaction/authaction-nextjs-example
   cd authaction-nextjs-example
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure your AuthAction credentials**:

   configure your AuthAction OAuth2 details using environment variables in your `.env.local` file

   ```bash
   NEXT_PUBLIC_AUTHACTION_DOMAIN=your-authaction-tenant-domain
   NEXT_PUBLIC_AUTHACTION_CLIENT_ID=your-authaction-client-id
   NEXT_PUBLIC_AUTHACTION_REDIRECT_URI=http://localhost:3000/callback
   NEXT_PUBLIC_AUTHACTION_LOGOUT_REDIRECT_URI=http://localhost:3000
   ```

4. **Configure callback and logout URLs in AuthAction**:

   Configure `http://localhost:3000/callback` in allowed callback URLs and `http://localhost:3000` in logout redirect URLs.

## Usage

1. **Start the Development Server**

   ```bash
   npm run dev
   ```

   This will start the Next.js application on `http://localhost:3000`.

2. **Testing Authentication**:

   - Navigate to `http://localhost:3000`.

   - Click the **Login** button to be redirected to the AuthAction login page via the OAuth2 flow.

   - After successful login, you will be redirected back to `/callback`, which completes the exchange and then forwards you to the dashboard with a personalized welcome message.

   - Click the **Log Out** button to trigger the logout flow and be redirected back to your app.

## Code Explanation

### Providers (`src/app/providers.tsx`)

- Wraps the application with `AuthActionNextProvider` from `@authaction/web-sdk/nextjs`.
- Passes `domain`, `clientId`, `redirectUri`, and `postLogoutRedirectUri` from `NEXT_PUBLIC_*` environment variables.

---

### Login Button (`src/app/loginbutton.tsx`)

- Uses `useAuthAction()` from `@authaction/web-sdk/nextjs` to get `loginWithRedirect`.
- Calls `loginWithRedirect({ appState: { returnTo: '/dashboard' } })` on click so the user lands on the dashboard after login.

---

### Callback Page (`src/app/callback/page.tsx`)

- Uses `useAuthAction()` to get `handleRedirectCallback`.
- Called on mount: exchanges the authorization code for tokens and redirects to `appState.returnTo` (or `/dashboard`).

---

### Dashboard Page (`src/app/dashboard/page.tsx`)

- Uses `useAuthAction()` to get `isAuthenticated`, `isLoading`, `user`, and `logout`.
- Redirects unauthenticated users back to `/` via `useRouter`.
- Displays the user's name and email and provides a **Log Out** button.

## Common Issues

- **Redirects not working**:

  - Ensure that `NEXT_PUBLIC_AUTHACTION_REDIRECT_URI` and `NEXT_PUBLIC_AUTHACTION_LOGOUT_REDIRECT_URI` match the URIs configured in your [AuthAction](https://app.authaction.com/) application settings.
  - Make sure the application is running on the same port as specified in the redirect URIs.

- **Network Errors**:
  - Verify that your network allows traffic to the Authaction servers and that there are no firewall rules blocking the OAuth2 redirects.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have improvements to suggest.
