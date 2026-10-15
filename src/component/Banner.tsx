'use client';
import Image from "next/image";
import TodayDate from "./TodayDate";

const Banner = () => {
      

  return (
      <div className="mx-auto w-full max-w-7xl px-4 py-4">
   <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
  
        <div className="max-w-2xl space-y-6">
          <TodayDate />

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm leading-relaxed text-gray-600 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <button className="rounded-lg bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>

      
        <div className="shrink-0">
          <Image
            height={300}
            width={300}
            src="/bazar-hero.png"
            alt=""
            className="h-auto w-48 object-contain md:w-72"
            priority
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Banner;
