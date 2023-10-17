import { River } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import Map from "@/components/Map";

const RainfallMap = async () => {
  const rivers = await fetcher<River[]>({ baseURL: process.env.API_URL, url: "/rivers", params: { type: "pch" } });

  return (
    <>
      <div className="text-4xl text-center mb-8">Persebaran Pos Curah Hujan</div>

      <div className="rounded-lg overflow-hidden z-0">
        <Map
          height={200}
          width={400}
          search={{
            data: rivers?.data
              ? rivers.data.map((river) => ({
                  position: [river.latitude, river.longitude],
                  title: river.name,
                }))
              : [],
          }}
          center={[3.3166, 117.5895]}
          zoom={8}
        />
      </div>
    </>
  );
};

export default RainfallMap;
