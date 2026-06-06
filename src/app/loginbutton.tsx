"use client";

import { useAuthAction } from "@authaction/web-sdk/nextjs";

export default function LoginButton() {
  const { loginWithRedirect } = useAuthAction();

  return (
    <button
      onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}
      className="px-6 py-3 bg-black hover:bg-blue-700 text-white rounded-lg shadow-lg"
    >
      Login
    </button>
  );
}
