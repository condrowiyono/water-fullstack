"use client";

import fetcher from "@/utils/fetcher";
import { ObservationCardProps } from "../mobile/_components/ObservationCard";
import { River, RiverCountType } from "@/interfaces";
import { Card, Col, Row, Table } from "antd";
import Meta from "antd/lib/card/Meta";
import Map from "@/components/Map";
import Link from "next/link";
import Clock from "./_components/clock";
import { useRequest } from "ahooks";

const Page = () => {
  const { data: riverCount } = useRequest(() => fetcher<RiverCountType>({ url: "/rivers-count" }));

  const { data: rivers } = useRequest(() => fetcher<River[]>({ url: "/rivers" }));

  const observationCard: ObservationCardProps[] = [
    {
      title: "Curah Hujan",
      icon: "/image/rainfall.png",
      color: "bg-green-600",
      total: riverCount?.data.pch?.total || 0,
      manual: riverCount?.data.pch?.manual || 0,
      telemetry: riverCount?.data.pch?.telemetry || 0,
      href: "/admin/river-observation?type=pch",
    },
    {
      title: "Duga Air",
      icon: "/image/waterlevel.png",
      color: "bg-blue-600",
      total: riverCount?.data.tma?.total || 0,
      manual: riverCount?.data.tma?.manual || 0,
      telemetry: riverCount?.data.tma?.telemetry || 0,
      href: "/admin/river-observation?type=tma",
    },
    {
      title: "Klimatologi",
      icon: "/image/climate.png",
      color: "bg-red-500",
      total: riverCount?.data.iklim?.total || 0,
      manual: riverCount?.data.iklim?.manual || 0,
      telemetry: riverCount?.data.iklim?.telemetry || 0,
      href: "/admin/river-observation?type=iklim",
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} lg={6}>
          <Card hoverable className="h-full flex items-center justify-center">
            <Clock />
          </Card>
        </Col>
        {observationCard.map((item, index) => (
          <Col xs={12} lg={6} key={index}>
            <Card hoverable className="h-full">
              <Link href={item.href || "#"}>
                <Meta
                  title={item.title}
                  description={
                    <>
                      <strong>Total: {item.total || item.manual + item.telemetry}</strong> |
                      <strong> Manual: {item.manual}</strong> |<strong> Telemetry: {item.telemetry}</strong>
                    </>
                  }
                />
              </Link>
            </Card>
          </Col>
        ))}
        <Col sm={24} lg={18}>
          <Card hoverable>
            <Map
              height={200}
              width={400}
              // markers={rivers.data.map((river) => ({
              //   position: [river.latitude, river.longitude],
              //   popup: river.name,
              // }))}
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
          </Card>
        </Col>
        <Col sm={24} lg={6}>
          <Card hoverable title="Data Pos">
            <Table
              showHeader={false}
              size="small"
              dataSource={rivers?.data || []}
              columns={[
                { title: "Tipe", dataIndex: "type" },
                { title: "Nama", dataIndex: "name" },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export const revalidate = 0;
export default Page;
