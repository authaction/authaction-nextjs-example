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

  if (isLoading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-cover bg-center bg-[url('/images/glowing.webp')] text-black">
      <div className="text-center bg-opacity-60 p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-4">Welcome to AuthApp</h1>
        <p className="text-lg mb-6 text-black">Please login to access your dashboard</p>
        <LoginButton />
      </div>
    </main>
  );
}
