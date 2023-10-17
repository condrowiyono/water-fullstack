import { Alert, Descriptions, Space } from "antd";
import fetcher from "@/utils/fetcher";
import { ClimateData, River } from "@/interfaces";
import InputForm from "./form";
import Detail from "./detail";
import BackButton from "../../_components/BackButton";

type ClimateDetailPageProps = {
  params: { id: string };
};

const fetch = async (id: string) => {
  return Promise.all([
    fetcher<River>({ baseURL: process.env.API_URL, url: `/rivers/${id}` }),
    fetcher<ClimateData>({ baseURL: process.env.API_URL, url: `/climates/today/${id}` }),
  ]);
};

const ClimateDetailPage = async ({ params }: ClimateDetailPageProps) => {
  const [{ data: river }, { data }] = await fetch(params.id);

  return (
    <>
      <BackButton href="/mobile/climate" />
      <h1 className="mb-2">Pos Klimatologi</h1>
      <Descriptions
        column={1}
        title="Informasi Klimatologi"
        items={[
          {
            key: "name",
            label: "Nama Pos",
            children: river.name,
          },
          {
            key: "city",
            label: "Kabupaten",
            children: river.city || "-",
          },
        ]}
      />
      {data ? (
        <Space direction="vertical" className="w-full">
          <div className="text-xl">Data Hari Ini</div>
          <Alert type="success" message="Data sudah diinput" />
          <Detail value={data} />
        </Space>
      ) : (
        <InputForm />
      )}
    </>
  );
};

export default ClimateDetailPage;
