import { Descriptions } from "antd";

import fetcher from "@/utils/fetcher";
import { WaterLevelData, River } from "@/interfaces";
import InputForm from "./form";
import BackButton from "../../_components/BackButton";

type WaterLevelDetailPageProps = {
  params: { id: string };
};

const fetch = async (id: string) => {
  return Promise.all([
    fetcher<River>({ baseURL: process.env.API_URL, url: `/rivers/${id}` }),
    fetcher<WaterLevelData[]>({ baseURL: process.env.API_URL, url: `/waterlevels/today/${id}` }),
  ]);
};

const WaterLevelDetailPage = async ({ params }: WaterLevelDetailPageProps) => {
  const [river, data] = await fetch(params.id);

  return (
    <>
      <BackButton href="/mobile/waterlevel" />
      <h1 className="mb-2">Pos Duga Air</h1>
      <Descriptions
        column={1}
        title="Informasi Pos Duga Air"
        items={[
          {
            key: "name",
            label: "Nama Pos",
            children: river.data.name,
          },
          {
            key: "city",
            label: "Kabupaten",
            children: river.data.city || "-",
          },
        ]}
      />
      <InputForm value={data.data} />
    </>
  );
};

export default WaterLevelDetailPage;
