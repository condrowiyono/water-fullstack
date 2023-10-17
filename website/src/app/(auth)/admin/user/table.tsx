"use client";

import { Table as AntdTable, TableProps, TablePaginationConfig, Space, Button } from "antd";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { User } from "@/interfaces";
import Link from "next/link";

const Table = (props: TableProps<User>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());

  const coloumn: TableProps<User>["columns"] = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Nama Pengguna",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "user_type",
    },
    {
      title: "Pos",
      dataIndex: ["river", "name"],
    },
    {
      title: "Action",
      fixed: "right",
      dataIndex: "id",
      render: (id) => (
        <Space>
          <Link href={`/admin/user/${id}/edit`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button size="small" disabled>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    const finalURL = qs.stringifyUrl({
      url: pathname,
      query: { ...searchParams, page: current, limit: pageSize },
    });

    router.push(finalURL);
  };

  return <AntdTable columns={coloumn} onChange={handleTableChange} {...props} />;
};

export default Table;
