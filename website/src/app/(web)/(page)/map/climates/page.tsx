import { River } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import Map from "@/components/Map";

const ClimateMap = async () => {
  const rivers = await fetcher<River[]>({ baseURL: process.env.API_URL, url: "/rivers", params: { type: "iklim" } });

  return (
    <>
      <div className="text-4xl text-center mb-8">Persebaran Pos Klimatologi</div>
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

export default ClimateMap;
