"use client";

import { RainfallData, TimeChartDate } from "@/interfaces";
import { Card, Col, DatePicker, Row, Segmented, Space, Table, notification } from "antd";
import { useRequest } from "ahooks";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import RainfallIntradayChart from "@/app/_components/charts/rainfall/intraday";
import dayjs, { formatDateTime } from "@/utils/dayjs";
import { ComponentProps, useState } from "react";

const segments: ComponentProps<typeof Segmented>["options"] = [
  { label: "Perhari", value: "intraday" },
  { label: "Bulanan", value: "monthly" },
  { label: "Tahunan", value: "yearly" },
  { label: "Dari Awal", value: "max" },
];

const renderChart = (type: string, series: any[]) => {
  switch (type) {
    case "intraday":
      return <RainfallIntradayChart series={series} />;
    case "daily":
      return <RainfallIntradayChart series={series} />;
    case "monthly":
      return <RainfallIntradayChart series={series} />;
    case "yearly":
      return <RainfallIntradayChart series={series} />;
    case "max":
      return <RainfallIntradayChart series={series} />;
    default:
      return null;
  }
};

const RainfallChart = ({ river }: { river: string }) => {
  const [segment, setSegment] = useState<string | number>("intraday");
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());

  const { data: table } = useRequest(() =>
    fetcher<RainfallData[]>({ url: `/admin/rainfalls`, params: { river_id: river } })
  );
  const { data: today } = useRequest(() => fetcher<RainfallData>({ url: `/rainfalls/today/${river}` }));

  const { data: chart } = useRequest(
    () =>
      fetcher<TimeChartDate>({
        url: `/data/rainfalls/${segment}`,
        params: { date: formatDateTime(date ?? new Date(), "YYYY-MM-DD"), river_id: river },
      }),
    {
      refreshDeps: [date, river, segment],
    }
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={14}>
        <Card title="Bagan" hoverable className="cursor-default">
          <div className="flex justify-center mb-2">
            <Segmented value={segment} onChange={setSegment} options={segments} />
          </div>
          <div className="flex justify-center mb-4">
            <DatePicker value={date} onChange={setDate} />
          </div>
          {renderChart(segment as string, [
            {
              name: "Curah Hujan",
              data: Object.entries(chart?.data ?? {}).map(
                ([key, value]) => [dayjs(key).valueOf(), value] as [number, number]
              ),
            },
          ])}
        </Card>
      </Col>
      <Col xs={24} lg={10}>
        <Card title="Data entry" hoverable>
          <Space className="mb-4 w-full" direction="vertical">
            <Card>
              <div className="flex justify-between items-center">
                Hari Ini
                {today?.data ? (
                  <div className="text-right">
                    <div className="font-bold text-2xl">{today?.data.data} mm</div>
                    <div className="text-xs">{today?.data.created_at || ""}</div>
                  </div>
                ) : (
                  <div> Belum di-input</div>
                )}
              </div>
            </Card>
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

export default RainfallChart;
