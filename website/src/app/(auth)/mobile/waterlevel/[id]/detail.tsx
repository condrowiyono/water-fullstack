import { WaterLevelData } from "@/interfaces";
import { Descriptions } from "antd";

const Detail = ({ value }: { value?: Partial<WaterLevelData> }) => {
  return (
    <Descriptions
      column={1}
      title="Informasi Pos Duga Air"
      items={[
        {
          key: "name",
          label: "Data",
          children: value?.data,
        },
        {
          key: "description",
          label: "Keterangan",
          children: value?.description || "-",
        },
        {
          key: "event",
          label: "Kejadian",
          children: value?.event || "-",
        },
        {
          key: "created_by",
          label: "Data diinput oleh",
          children: value?.user?.email || "-",
        },
      ]}
    />
  );
};

export default Detail;
