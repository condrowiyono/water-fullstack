"use client";

import { ClimateData } from "@/interfaces";
import { formatDateTime } from "@/utils/dayjs";
import fetcher from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { Card, Col, Row, Table } from "antd";

const WaterLevelChart = ({ river }: { river: string }) => {
  const { data: table } = useRequest(() =>
    fetcher<ClimateData[]>({ url: `/admin/climates`, params: { river_id: river } })
  );
  const { data: today, loading } = useRequest(() => fetcher<ClimateData>({ url: `/climates/today/${river}` }));

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={14}>
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
      </Col>
      <Col xs={24} lg={10}>
        <Card title="Data entry" hoverable>
          <Table
            dataSource={table?.data ?? []}
            rowKey="id"
            size="small"
            pagination={false}
            columns={[
              { title: "Tanggal", dataIndex: "date" },
              { title: "Data", dataIndex: "rainfall" },
              { title: "Suhu Min", dataIndex: "min_temperature" },
              { title: "Suhu Max", dataIndex: "max_temperature" },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default WaterLevelChart;
