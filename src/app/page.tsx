"use client";

import { useAuthAction } from "@authaction/web-sdk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "./loginbutton";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthAction();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm px-8 py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white text-lg font-bold mb-5">
            A
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Access your AuthAction account
          </p>
        </div>
        <LoginButton />
        <p className="mt-6 text-center text-xs text-gray-400">
          Secured by{" "}
          <span className="font-medium text-gray-600">AuthAction</span>
        </p>
      </div>
    </main>
  );
}
