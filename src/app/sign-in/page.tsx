
"use client";
import { authClient } from '@/lib/auth-client';

import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from "react-toastify";

import { FcGoogle } from "react-icons/fc";
import { DiGithubBadge } from "react-icons/di";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    
  };

  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex min-h-screen justify-center bg-gray-200 px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4"
      >
        {/* Heading */}
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            সাইন ইন
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

      
        <fieldset className="fieldset w-full rounded-box border border-gray-300 bg-white p-5">
          <label className="label">ইমেইল</label>

          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="you@example.com"
            required
          />

          <label className="label">পাসওয়ার্ড</label>

          <input
            type="password"
            name="password"
            className="input w-full"
            placeholder="কমপক্ষে ৮ অক্ষর"
            minLength={8}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn mt-4 w-full border-0 bg-green-700 text-white hover:bg-green-800"
          >
            {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>

          <div className="relative flex items-center py-3">
            <div className="flex-grow border-t border-gray-300"></div>

            <span className="mx-4 shrink-0 text-xs text-gray-500">
              অথবা
            </span>

            <div className="flex-grow border-t border-gray-300"></div>
          </div>
<div className="flex w-full gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle size={22} />
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50"
          >
            <DiGithubBadge size={22} />
            GitHub দিয়ে চালিয়ে যান
          </button>
</div>
          <p className="mt-3 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-green-700 hover:underline"
            >
              সাইন আপ করুন
            </a>
          </p>
        </fieldset>

        <Link
          href="/"
          className="block text-center hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
