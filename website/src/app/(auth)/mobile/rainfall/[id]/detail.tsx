import { RainfallData } from "@/interfaces";
import { formatDateTime } from "@/utils/dayjs";
import { Descriptions } from "antd";

const Detail = ({ value }: { value: Partial<RainfallData> }) => {
  return (
    <Descriptions
      column={1}
      items={[
        {
          key: "date",
          label: "Tanggal",
          children: value.date ? formatDateTime(value.date) : "-",
        },
        {
          key: "data",
          label: "Data",
          children: value.data || "-",
        },
        {
          key: "duration",
          label: "Lama Hujan",
          children: value.duration || "-",
        },
        {
          key: "description",
          label: "Keterangan",
          children: value.description || "-",
        },
        {
          key: "event",
          label: "Kejadian",
          children: value.event || "-",
        },
        {
          key: "created_by",
          label: "Data diinput oleh",
          children: value.user?.email || "-",
        },
      ]}
    />
  );
};

export default Detail;
