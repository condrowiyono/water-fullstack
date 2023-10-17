"use client";

import { useRequest } from "ahooks";
import { Card, Col, Row, Segmented, Space, Table, theme } from "antd";
import { River, WaterLevelData } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import { formatDateTime } from "@/utils/dayjs";

const WaterLevelChart = ({ river }: { river: string }) => {
  const { token } = theme.useToken();

  const { data: table } = useRequest(() =>
    fetcher<WaterLevelData[]>({ url: `/admin/waterlevels`, params: { river_id: river } })
  );
  const { data: today } = useRequest(() => fetcher<WaterLevelData[]>({ url: `/waterlevels/today/${river}` }));
  const { data, loading } = useRequest(() => fetcher<River>({ url: `/rivers/${river}` }));

  if (loading || !data?.data) return <p>Loading...</p>;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={15}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="Siaga" hoverable>
              <Card.Grid style={{ backgroundColor: token.colorSuccess }} hoverable>
                <Card.Meta
                  title={<span className="text-white text-2xl">{data.data.green_light}</span>}
                  description="Siaga Hijau"
                />
              </Card.Grid>
              <Card.Grid style={{ backgroundColor: token.colorWarning }} hoverable>
                <Card.Meta
                  title={<span className="text-white text-2xl">{data.data.yellow_light}</span>}
                  description="Siaga Kuning"
                />
              </Card.Grid>
              <Card.Grid style={{ backgroundColor: token.colorError }} hoverable>
                <Card.Meta
                  title={<span className="text-white text-2xl">{data.data.red_light}</span>}
                  description="Siaga Merah"
                />
              </Card.Grid>
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Bagan" hoverable>
              <div className="flex justify-between">
                <Segmented
                  className="mx-auto mb-4"
                  options={[
                    { label: "Hari ini", value: "intraday" },
                    { label: "Harian", value: "daily" },
                    { label: "Rentang Tanggal", value: "range" },
                  ]}
                />
              </div>
              <div style={{ height: 300, overflow: "auto" }}>Under Construction</div>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={9}>
        <Card title="Data terkahir" hoverable>
          <Space className="w-full" direction="vertical">
            {today?.data?.map((item) => (
              <Card key={item.id}>
                <div className="flex justify-between items-center">
                  <div>Hari ini: {formatDateTime(item.date)}</div>
                  <div className="text-2xl font-bold">{item.data}</div>
                </div>
              </Card>
            ))}
            <Table
              dataSource={table?.data ?? []}
              rowKey="id"
              size="small"
              pagination={false}
              columns={[
                { title: "Tanggal", dataIndex: "date" },
                { title: "Data", dataIndex: "data" },
                { title: "Created At", dataIndex: "created_at" },
              ]}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default WaterLevelChart;
