"use client";

import { useState, useEffect } from "react";
import { defaultTimezone, formatDateTime } from "@/utils/dayjs";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>{formatDateTime(time, "dddd, DD MMMM YYYY")}</div>
      <div className="text-4xl font-bold">{formatDateTime(time, "HH:mm:ss")}</div>
    </div>
  );
};

export default Clock;
