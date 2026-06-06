"use client";

import { useAuthAction } from "@authaction/web-sdk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const { handleRedirectCallback } = useAuthAction();
  const router = useRouter();

  useEffect(() => {
    handleRedirectCallback()
      .then(({ appState }) => {
        router.replace((appState?.returnTo as string) ?? "/dashboard");
      })
      .catch(() => router.replace("/"));
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <p>Completing login...</p>
    </main>
  );
}
