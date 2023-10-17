"use client";

import RainfallIntradayChart from "@/app/_components/charts/rainfall/intraday";
import Tab from "../../_components/Tab";
import { useState } from "react";
import { useRequest } from "ahooks";
import { River, TimeChartDate } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import dayjs, { formatDateTime } from "@/utils/dayjs";

const tabs = [
  { label: "Perhari", value: "intraday" },
  { label: "Bulanan", value: "monthly" },
  { label: "Tahunan", value: "yearly" },
  { label: "Dari Awal", value: "max" },
];

const RainfallDetailPage = ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState("intraday");
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const { data: river } = useRequest(() => fetcher<River>({ url: `rivers/${params.id}` }));
  const { data: chart, loading } = useRequest(
    () =>
      fetcher<TimeChartDate>({
        url: `/data/rainfalls/${tab}`,
        params: { date: formatDateTime(date ?? new Date(), "YYYY-MM-DD"), river_id: params.id },
      }),
    {
      refreshDeps: [date, params.id, tab],
    }
  );

  return (
    <div>
      <div className="text-4xl text-center mb-8">{river?.data?.name}</div>
      <Tab tabs={tabs} value={tab} onChange={setTab} />
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <span className="loading loading-infinity loading-lg "></span>
        </div>
      ) : (
        <RainfallIntradayChart
          series={[
            {
              name: "Curah Hujan",
              data: Object.entries(chart?.data ?? {}).map(
                ([key, value]) => [dayjs(key).valueOf(), value] as [number, number]
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default RainfallDetailPage;
