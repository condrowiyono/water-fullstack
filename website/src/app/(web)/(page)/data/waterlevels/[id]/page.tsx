import { River, WaterLevelData } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import { formatDateTime } from "@/utils/dayjs";

const WaterlevelDetailPage = async ({ params }: { params: { id: string } }) => {
  const river = await fetcher<River>({ url: `rivers/${params.id}` });
  const today = await fetcher<WaterLevelData[]>({ url: `/waterlevels/today/${params.id}` });

  return (
    <div>
      <div className="text-4xl text-center min-h-16">{river?.data?.name}</div>
      <div className="text-2xl text-center mb-8">Data Hari Ini</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {today?.data.map((item) => (
          <div key={item.id} className="stats shadow no-underline hover:scale-105 transition-scale duration-200">
            <div className="stat">
              <div className="stat-value">{item.data}</div>
              <div className="stat-desc">{formatDateTime(item.date)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterlevelDetailPage;
