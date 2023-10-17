"use client";

import { useRequest } from "ahooks";
import { ClimateData, River } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import { formatDateTime } from "@/utils/dayjs";
import { Card } from "antd";

const ClimateDetailPage = ({ params }: { params: { id: string } }) => {
  const { data: river } = useRequest(() => fetcher<River>({ url: `rivers/${params.id}` }));
  const { data: today, loading } = useRequest(() => fetcher<ClimateData>({ url: `/climates/today/${params.id}` }));

  return (
    <div>
      <div className="text-4xl text-center mb-8">{river?.data?.name}</div>
      <Card
        loading={loading}
        title="Data Hari Ini"
        extra={<div className="text-sm">{formatDateTime(today?.data?.created_at)}</div>}
      >
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.rainfall ?? "N/A"}</div>
          <div className="text-sm text-gray-500">mm</div>
          <Card.Meta description="Curah Hujan" />
        </Card.Grid>
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.min_temperature ?? "N/A"}</div>
          <div className="text-sm text-gray-500">°C</div>
          <Card.Meta description="Suhu Minimum" />
        </Card.Grid>
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.max_temperature ?? "N/A"}</div>
          <div className="text-sm text-gray-500">°C</div>
          <Card.Meta description="Suhu Maksimum" />
        </Card.Grid>
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.humidity ?? "N/A"}</div>
          <div className="text-sm text-gray-500">%</div>
          <Card.Meta description="Kelembaban" />
        </Card.Grid>
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.wind_speed ?? "N/A"}</div>
          <div className="text-sm text-gray-500">km/Hari</div>
          <Card.Meta description="Kecepatan Angin" />
        </Card.Grid>
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.illumination_duration ?? "N/A"}</div>
          <div className="text-sm text-gray-500">jam</div>
          <Card.Meta description="Lama Penyinaran" />
        </Card.Grid>
        <Card.Grid style={{ width: "25%" }}>
          <div className="text-4xl font-bold">{today?.data?.evaporation ?? "N/A"}</div>
          <div className="text-sm text-gray-500">mm/Hari</div>
          <Card.Meta description="Penguapan" />
        </Card.Grid>
      </Card>
    </div>
  );
};

export default ClimateDetailPage;
