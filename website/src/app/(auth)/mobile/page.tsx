import fetcher from "@/utils/fetcher";
import ObservationCard, { ObservationCardProps } from "./_components/ObservationCard";
import { RiverCountType } from "@/interfaces";

const Page = async () => {
  const riverCount = await fetcher<RiverCountType>({ baseURL: process.env.API_URL, url: "/rivers-count" });

  const observationCard: ObservationCardProps[] = [
    {
      title: "Curah Hujan",
      icon: "/image/rainfall.png",
      color: "bg-green-600",
      total: riverCount.data.pch?.total || 0,
      manual: riverCount.data.pch?.manual || 0,
      telemetry: riverCount.data.pch?.telemetry || 0,
      href: "/mobile/rainfall",
    },
    {
      title: "Duga Air",
      icon: "/image/waterlevel.png",
      color: "bg-blue-600",
      total: riverCount.data.tma?.total || 0,
      manual: riverCount.data.tma?.manual || 0,
      telemetry: riverCount.data.tma?.telemetry || 0,
      href: "/mobile/waterlevel",
    },
    {
      title: "Klimatologi",
      icon: "/image/climate.png",
      color: "bg-red-500",
      total: riverCount.data.iklim?.total || 0,
      manual: riverCount.data.iklim?.manual || 0,
      telemetry: riverCount.data.iklim?.telemetry || 0,
      href: "/mobile/climate",
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <h1>Dashboard</h1>
        <h2>Hidrologi</h2>
      </div>
      <div className="grid grid-cols-2  gap-2">
        {observationCard.map((item, index) => (
          <ObservationCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
