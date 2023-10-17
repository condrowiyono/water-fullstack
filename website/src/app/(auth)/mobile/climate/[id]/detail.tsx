import { ClimateData } from "@/interfaces";
import { formatDateTime } from "@/utils/dayjs";
import { Descriptions } from "antd";

const Detail = ({ value }: { value: Partial<ClimateData> }) => {
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
          key: "rainfall",
          label: "Curah Hujan",
          children: value.rainfall || "-",
        },
        {
          key: "min_temperature",
          label: "Suhu Minimum",
          children: value.min_temperature || "-",
        },
        {
          key: "max_temperature",
          label: "Suhu Maksimum",
          children: value.max_temperature || "-",
        },
        {
          key: "humidity",
          label: "Kelembaban",
          children: value.humidity || "-",
        },
        {
          key: "wet_humidity",
          label: "Kelembaban Basah",
          children: value.wet_humidity || "-",
        },
        {
          key: "dry_humidity",
          label: "Kelembaban Kering",
          children: value.dry_humidity || "-",
        },
        {
          key: "wind_speed",
          label: "Kecepatan Angin",
          children: value.wind_speed || "-",
        },
        {
          key: "illumination_duration",
          label: "Durasi Pencahayaan",
          children: value.illumination_duration || "-",
        },
        {
          key: "evaporation",
          label: "Evaporasi",
          children: value.evaporation || "-",
        },
        {
          key: "min_float_level",
          label: "Tinggi Minimum",
          children: value.min_float_level || "-",
        },
        {
          key: "max_float_level",
          label: "Tinggi Maksimum",
          children: value.max_float_level || "-",
        },
        {
          key: "upper_hook",
          label: "Hook Atas",
          children: value.upper_hook || "-",
        },
        {
          key: "lower_hook",
          label: "Hook Bawah",
          children: value.lower_hook || "-",
        },
        {
          key: "observation",
          label: "Observasi",
          children: value.observation || "-",
        },
        {
          key: "illumination_process",
          label: "Proses Pencahayaan",
          children: value.illumination_process || "-",
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
