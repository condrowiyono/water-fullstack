import BackButton from "../../_components/BackButton";
import fetcher from "@/utils/fetcher";
import { RainfallData, River } from "@/interfaces";
import { Alert, Descriptions, Space } from "antd";
import InputForm from "./form";
import Detail from "./detail";

type RainfallDetailPageProps = {
  params: { id: string };
};

const fetch = async (id: string) => {
  return Promise.all([
    fetcher<River>({ baseURL: process.env.API_URL, url: `/rivers/${id}` }),
    fetcher<RainfallData>({ baseURL: process.env.API_URL, url: `/rainfalls/today/${id}` }),
  ]);
};

const RainfallDetailPage = async ({ params }: RainfallDetailPageProps) => {
  const [river, data] = await fetch(params.id);

  return (
    <>
      <BackButton href="/mobile/rainfall" />
      <h1 className="mb-2">Pos Curah Hujan</h1>
      <Descriptions
        column={1}
        title="Informasi Pos Curah Hujan"
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
      {data.data ? (
        <Space direction="vertical" className="w-full">
          <div className="text-xl">Data Hari Ini</div>
          <Alert type="success" message="Data sudah diinput" />
          <Detail value={data.data} />
        </Space>
      ) : (
        <InputForm />
      )}
    </>
  );
};

export default RainfallDetailPage;
