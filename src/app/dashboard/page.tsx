"use client";

import { useAuthAction } from "@authaction/web-sdk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "../components/dashboard";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuthAction();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </main>
    );
  }

  return <Dashboard />;
}
