"use client";

import { useAuthAction } from "@authaction/web-sdk/nextjs";

const Dashboard = () => {
  const { user, logout } = useAuthAction();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <span className="font-semibold text-gray-900">AuthAction</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              {initials}
            </div>
            <button
              onClick={() => logout()}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Welcome back</p>
          <h1 className="text-2xl font-semibold text-gray-900 mt-0.5">
            {user?.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Full Name
            </p>
            <p className="text-gray-900 font-medium">{user?.name ?? "—"}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Email
            </p>
            <p className="text-gray-900 font-medium">{user?.email ?? "—"}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              User ID
            </p>
            <p className="text-gray-900 font-mono text-sm truncate">
              {user?.sub ?? "—"}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Status
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Authenticated
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
