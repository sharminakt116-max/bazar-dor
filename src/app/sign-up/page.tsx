
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-10">
      <form className="w-full max-w-md space-y-4">
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

          <p className="mt-3 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <a href="/sign-in" className="font-semibold text-green-700 hover:underline">
              সাইন ইন করুন
            </a>
            
          </p>
        
        </fieldset>
          <Link href="/" className=" block text-center hover:underline ">
  ← হোম পেজে ফিরে যান
</Link>
      </form>
     
    </div>
  );
};

export default SignupPage;