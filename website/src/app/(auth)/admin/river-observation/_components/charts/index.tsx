"use client";

import RainfallChart from "./rainfall";
import WaterLevelChart from "./waterlevel";
import ClimateChart from "./climate";
import { useRequest } from "ahooks";
import fetcher from "@/utils/fetcher";
import { River } from "@/interfaces";

const renderChart = (type: string, river: string) => {
  switch (type) {
    case "pch":
      return <RainfallChart river={river} />;
    case "tma":
      return <WaterLevelChart river={river} />;
    case "iklim":
      return <ClimateChart river={river} />;
    default:
      return null;
  }
};

const Chart = ({ river }: { river: string }) => {
  const { data, loading, error } = useRequest(() => fetcher<River>({ url: `/rivers/${river}` }));

  if (loading || !data?.data) return null;
  if (error) return <p>Error...</p>;

  return (
    <>
      <h1 className="text-2xl mb-2">Data Pengamatan</h1>
      {renderChart(data.data.type, river)}
    </>
  );
};

export default Chart;
