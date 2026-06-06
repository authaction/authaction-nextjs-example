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
      <main className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  return <Dashboard />;
}
