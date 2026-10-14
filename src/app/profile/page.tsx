"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // User name input-এ দেখানো
  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  // Update name
  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error("নাম আপডেট করা যায়নি");
      } else {
        toast.success("নাম আপডেট হয়েছে!");
      }
    } catch {
      toast.error("আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  }

  // Sign out
  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি");
    } else {
      window.location.href = "/";
    }
  }

  // Loading
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f4f1]">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }



  return (
    <main className="min-h-screen bg-[#f3f4f1] px-4 py-12 text-gray-800">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header */}
        <div className="px-2">
          <h1 className="text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Card */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-xl font-bold text-gray-600">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="rounded-lg px-3 py-3 text-left text-red-600 hover:bg-red-50"
          >
            ↪ সাইন আউট
          </button>
        </div>

        {/* Edit Information */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 font-bold text-gray-900">
            তথ্য
          </h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold text-gray-700"
              >
                নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading || name.trim() === user.name}
              className="w-full rounded-xl bg-green-700 py-3.5 text-sm font-medium text-white hover:bg-[#046e36] disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>

    
        <Link
          href="/"
          className="block text-center text-sm text-gray-600 hover:text-emerald-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
}