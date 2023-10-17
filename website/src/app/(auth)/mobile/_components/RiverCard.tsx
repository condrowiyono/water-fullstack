import { Button, Card, Space } from "antd";
import Link from "next/link";
import { River } from "@/interfaces";

const mapHref = new Map([
  ["pch", "/mobile/rainfall"],
  ["tma", "/mobile/waterlevel"],
  ["iklim", "/mobile/climate"],
]);

const RiverCard = (props: River) => {
  const { name, type, city, id } = props;

  return (
    <Card>
      <Space direction="vertical">
        <div className="text-xl font-bold">{name}</div>
        <div className="font-bold">KAB/KOTA: {city || "-"}</div>

        <Link href={`${mapHref.get(type)}/${id}`}>
          <Button type="primary">Input Data</Button>
        </Link>
      </Space>
    </Card>
  );
};

export default RiverCard;
