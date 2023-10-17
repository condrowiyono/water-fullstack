"use client";

import { River } from "@/interfaces";
import { Card, Col, Descriptions, Row, Space } from "antd";
import Map from "@/components/Map";
import { useRequest } from "ahooks";
import fetcher from "@/utils/fetcher";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { formatDateTime } from "@/utils/dayjs";

const Detail = ({ river }: { river: string }) => {
  const [show, setShow] = useState(true);
  const { data, loading } = useRequest(() => fetcher<River>({ url: `/rivers/${river}` }));

  return (
    <>
      <Space className="text-2xl mb-2">
        Detail Pos Hidrologi
        <small>
          {show ? (
            <EyeInvisibleOutlined onClick={() => setShow(false)} />
          ) : (
            <EyeOutlined onClick={() => setShow(true)} />
          )}
        </small>
      </Space>
      <Row gutter={[16, 16]} style={{ display: show ? "flex" : "none" }}>
        <Col xs={24} lg={14}>
          <Card title="Data Pos Hidrologi" hoverable loading={loading}>
            <Descriptions
              column={2}
              items={[
                { label: "Nama Pos", children: data?.data.name },
                { label: "Nomor Register", children: data?.data.registry_number },
                { label: "WS/DAS", children: data?.data.watershed },
                { label: "Sungai Induk", children: data?.data.main_river },
                { label: "Anak Sungai", children: data?.data.tributary },
                { label: "Tipe", children: data?.data.type },
                { label: "Jenis", children: data?.data.observation },
                { label: "Desa", children: data?.data.village },
                { label: "Kecamatan", children: data?.data.district },
                { label: "Kabupaten", children: data?.data.city },
                { label: "Create At", children: formatDateTime(data?.data.created_at) },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Peta" hoverable loading={loading}>
            {data?.data.latitude && data?.data.longitude ? (
              <Map
                width={600}
                height={300}
                markers={[{ position: [data.data.latitude, data.data.longitude], popup: data.data.name }]}
                center={[data.data.latitude, data.data.longitude]}
                zoom={12}
              />
            ) : (
              <p>Pos tidak memiliki data koordinat</p>
            )}
            <div>
              Link Google Maps:
              <a
                href={`https://maps.google.com/?q=${data?.data.latitude},${data?.data.longitude}`}
                target="_blank"
                rel="noreferrer"
              >
                {`https://maps.google.com/?q=${data?.data.latitude},${data?.data.longitude}`}
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Detail;
