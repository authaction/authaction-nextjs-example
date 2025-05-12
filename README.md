# authaction-nextjs-example

This is a Nextjs application demonstrating how to integrate OAuth2 authentication using [AuthAction](https://app.authaction.com/) and NextAuth.js with secure JWT-based session handling.

## Overview

This application showcases:

- OAuth2 login flow using AuthAction via NextAuth.js.
- Storing and accessing accessToken and idToken via JWT sessions.
- Protected route example (`/dashboard`) that shows authenticated content.
- Logout handling with AuthAction-compliant redirect and token hint.
- Secure API route (`/api/profile`) that uses the session to return protected user info.

## Prerequisites

Before running this application, ensure you have:

1. **Node.js and npm installed**: [Download from nodejs.org](https://nodejs.org/)
2. **AuthAction OAuth2 credentials**:
   - Tenant Domain
   - Client ID
   - Client Secret
   - Redirect URIs (login and logout)

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

3. **Configure your Authaction credentials**:

   configure your AuthAction OAuth2 details using environment variables in your .env file

   ```bash
   AUTHACTION_CLIENT_ID=your-authaction-client-id
   AUTHACTION_CLIENT_SECRET=your-authaction-client-secret
   AUTHACTION_TENANT_DOMAIN=your-authaction-tenant-domain.authaction.com
   NEXTAUTH_SECRET=your-random-secret
   ```
## Usage

1. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This will start the Next application on `http://localhost:3000`.

2. **Testing Authentication**:

    - Navigate to http://localhost:3000.

    - You will be automatically redirected to the AuthAction login page via the NextAuth OAuth2 flow.

    - After successful login, you will be redirected to the dashboard with a personalized welcome message.

    - Click the "View Profile Info" button to fetch and display protected profile data from a secured API route.

    - Click the "Log Out" button to trigger the OAuth2 logout flow via AuthAction's id_token_hint, and get redirected back to your app after logout.

## Code Explanation


### Configuration (`pages/api/auth/[...nextauth].ts`)

  - Uses `next-auth` with a custom OAuth2 provider pointing to AuthAction's `.well-known/openid-configuration`.
  - Handles both `access_token` and `id_token` returned from AuthAction.
  - Tokens are stored securely using the JWT session strategy (`session: { strategy: "jwt" }`).
  - The `callbacks.jwt` and `callbacks.session` ensure that tokens are correctly extracted and attached to the user's session.

---

### Dashboard Component (`/app/dashboard/page.tsx`)

- Uses `useSession` from `next-auth/react` to determine the authentication state of the user.
- Displays a personalized welcome message based on the authenticated user's name.
- Includes a **"View Profile Info"** button, which triggers a modal using a `Dialog` component.
- The modal fetches protected profile data from an API route (`/api/profile`) if the user is authenticated.
- A **"Log Out"** button triggers `signOut()` and then manually redirects the user to AuthAction’s logout endpoint with `id_token_hint` and `post_logout_redirect_uri`.

---

### Protected API Route (`pages/api/profile.ts`)

- Uses `getServerSession()` to validate the presence of a valid authenticated session.
- If a valid session exists, it returns the user's `name` and `email`.
- If no session is found (unauthenticated access), it responds with a `401 Unauthorized` status and an error message.

## Common Issues

- **Redirects not working**:

  - Ensure that the `redirectUri` and `logoutRedirectUri` match the URIs configured in your [AuthAction](https://app.authaction.com/) application settings.
  - Make sure the application is running on the same port as specified in the `redirectUri`.

- **Network Errors**:
  - Verify that your network allows traffic to the Authaction servers and that there are no firewall rules blocking the OAuth2 redirects.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have improvements to suggest.


