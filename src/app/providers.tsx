"use client";

import React, { JSX, ReactNode } from "react";
import { AuthActionNextProvider } from "@authaction/web-sdk/nextjs";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  return (
    <AuthActionNextProvider
      domain={process.env.NEXT_PUBLIC_AUTHACTION_TENANT_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTHACTION_CLIENT_ID!}
      redirectUri={process.env.NEXT_PUBLIC_AUTHACTION_REDIRECT_URI!}
      postLogoutRedirectUri={process.env.NEXT_PUBLIC_AUTHACTION_LOGOUT_REDIRECT_URI}
      cacheLocation="localstorage"
    >
      {children}
    </AuthActionNextProvider>
  );
}
