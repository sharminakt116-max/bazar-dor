"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
const SignupPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো!");
    }
  };
 
  const handleGoogleSignUp = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Google sign-in error:", error);
    }
  } catch (error) {
    console.error("Google sign-up error:", error);
  }
};
  

  
  return (
    <div className="flex min-h-screen  justify-center bg-gray-200 px-4 py-10">
      <div  className="w-full max-w-md space-y-4">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            অ্যাকাউন্ট তৈরি করুন
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={onSubmit}>
        <fieldset className="fieldset w-full rounded-box border border-gray-300 bg-white p-6">
          <label className="label">নাম</label>
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="যেমন: রহিম উদ্দিন"
            required
          />

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

          <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            type="password"
            name="confirmPassword"
            className="input w-full"
            placeholder="আবার লিখুন"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="btn mt-4 w-full border-0 bg-green-700 text-white hover:bg-green-800"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>

          <div className="relative flex items-center py-3">
           <div className="flex-grow border-t border-gray-300"></div>
             <span className="mx-4 shrink-0 text-xs text-gray-500"> অথবা</span>
          <div className="flex-grow border-t border-gray-300"></div>
          </div>

               <button
            type="button"
            onClick={handleGoogleSignUp}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle size={22} />
          
            Google দিয়ে চালিয়ে যান
          </button>

          <p className="mt-3 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <a href="/sign-in" className="font-semibold text-green-700 hover:underline">
              সাইন ইন করুন
            </a>
            
          </p>
        
        </fieldset>
        </form>
          <Link href="/" className=" block text-center hover:underline ">
  ← হোম পেজে ফিরে যান
</Link>
      </div>
     
    </div>
  );
};

export default SignupPage;