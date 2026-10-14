
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const UserInfo = () => {
  const {
    data: session,
    isPending,
  } = authClient.useSession();

  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sign Out
  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (!error) {
      setIsOpen(false);
      window.location.href = "/";
    }
  };

  if (isPending) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <>
     
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100"
          >
            <div className="avatar">
              <div className="w-10 overflow-hidden rounded-full ring-2 ring-green-700 ring-offset-2">
              {user.image ? (
  <img
    src={user.image}
    alt={user.name || "User"}
    className="h-full w-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center bg-green-100 text-xl text-green-800">
    👤
  </div>
)}
              </div>
            </div>

            <div className="hidden text-left sm:block">
              <h2 className="font-semibold text-gray-800">
                {user.name}
              </h2>

              
            </div>

            <span className="text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          </button>

          
          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
              <div className="border-b border-gray-200 px-3 py-3">
                <p className="font-semibold text-gray-800">
                  {user.name}
                </p>

                <p className="break-all text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="mt-2 block rounded-lg px-3 py-3 text-gray-700 transition hover:bg-green-50 hover:text-green-800"
              >
                👤 আমার প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded-lg px-3 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                ↪ সাইন আউট
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/sign-in"
            className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn rounded-xl bg-green-700 px-5 py-2 text-white shadow-md transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;