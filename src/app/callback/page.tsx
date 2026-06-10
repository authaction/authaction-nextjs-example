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
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Completing sign in…</p>
      </div>
    </main>
  );
}
