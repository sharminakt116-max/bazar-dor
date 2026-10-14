import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/component/Header";
import Marquee from "@/component/Marquee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/component/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        <Suspense
          fallback={
            <p className="py-3 text-center">
              বাজারদর লোড হচ্ছে...
            </p>
          }
        >
          <Marquee />
        </Suspense>

        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
       <Footer/>
      </body>
       
    </html>
  );
}