"use client";

import { useEffect, useState } from "react";

const TodayDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  return <p className="text-sm text-gray-600">{date}</p>;
};

export default TodayDate;