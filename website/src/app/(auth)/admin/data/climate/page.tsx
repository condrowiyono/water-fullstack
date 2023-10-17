"use client";

import { Pagination, River } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { Card, Space } from "antd";
import Filter from "../_components/filter";
import Table from "../_components/table";

type SearchParamsType = Pick<River & Pagination, "name" | "type" | "limit" | "page">;

const ClimatePate = ({ searchParams }: { searchParams: SearchParamsType }) => {
  const { data, loading } = useRequest(
    () =>
      fetcher<River[]>({
        url: `admin/rivers`,
        params: { ...searchParams, type: "iklim" },
      }),
    {
      refreshDeps: [searchParams],
    }
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Daftar Pos">
        <Filter initialValues={searchParams} />
      </Card>
      <Card title="Hasil Pencarian">
        <Table
          loading={loading}
          rowKey="id"
          dataSource={data?.data}
          pagination={{
            total: data?.meta?.total || 0,
            current: data?.meta?.page || 1,
            pageSize: data?.meta?.limit || 10,
          }}
        />
      </Card>
    </Space>
  );
};

export default ClimatePate;
