"use client";

import { useAuthAction } from "@authaction/web-sdk/nextjs";

export default function LoginButton() {
  const { loginWithRedirect } = useAuthAction();

  return (
    <button
      onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}
      className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      Continue
    </button>
  );
}
