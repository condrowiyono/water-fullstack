"use client";

import fetcher from "@/utils/fetcher";
import { Pagination, User } from "@/interfaces";
import { Button, Card, Space } from "antd";
import Table from "./table";
import Filter from "./filter";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRequest } from "ahooks";

type SearchParamsType = Partial<User & Pagination>;

const UserPage = ({ searchParams }: { searchParams: SearchParamsType }) => {
  const session = useSession();
  const token = session?.data?.accessToken;

  const { data, loading } = useRequest(
    () =>
      fetcher<User[]>({
        url: "/admin/users",
        params: searchParams,
        headers: { Authorization: `Bearer ${token}` },
      }),
    {
      refreshDeps: [searchParams, token],
    }
  );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card title="Pengguna">
        <Filter initialValues={searchParams} />
      </Card>
      <Card
        title="Hasil Pencarian"
        extra={
          <Link href="/admin/user/create">
            <Button type="primary">Buat Baru</Button>
          </Link>
        }
      >
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

export const revalidate = 0;
export default UserPage;
