import fetcher from "@/utils/fetcher";
import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react";

type ObservationDataCards = {
  type: "rainfalls" | "waterlevels" | "climates";
  unit?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const ObservationDataCards = async ({ type, unit, ...props }: ObservationDataCards) => {
  const data = await fetcher<{ id: number; name: string; data: number }[]>({
    baseURL: process.env.API_URL,
    url: `/data/${type}/today`,
  });

  return (
    <div {...props}>
      <Suspense fallback={<div className="w-full h-[400px] flex items-center justify-center">Loading...</div>}>
        {data.data.map((item) => (
          <Link
            key={item.id}
            className="stats shadow no-underline hover:scale-105 transition-scale duration-200"
            href={`/data/${type}/${item.id}`}
          >
            <div className="stat">
              <div className="stat-title">{item.name}</div>
              <div className="stat-value">{Math.round(item.data)}</div>
              <div className="stat-desc">{unit}</div>
            </div>
          </Link>
        ))}
      </Suspense>
    </div>
  );
};

export default ObservationDataCards;
