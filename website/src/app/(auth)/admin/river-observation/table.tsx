"use client";

import { Table as AntdTable, TableProps, TablePaginationConfig, Space, Button, Drawer } from "antd";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { River } from "@/interfaces";
import { DeleteOutlined, FileExcelOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import Form from "@/components/Form";
import { dayjsTz } from "@/utils/dayjs";

const Table = (props: TableProps<River>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());
  const [drawer, setDrawer] = useState<{ visible: boolean; data?: River }>();

  const handleShowDownload = (value: River) => {
    setDrawer({ visible: true, data: value });
  };

  const handleDownload = (values: { year: string; type: "xlsx" | "pdf" }) => {
    window.open(
      `/admin/river-observation/${drawer?.data?.id}/${drawer?.data?.type}/${values.year}/export?type=${values.type}`
    );
  };

  const coloumn: TableProps<River>["columns"] = [
    {
      title: "Nama Pos",
      dataIndex: "name",
    },
    {
      title: "Nomor Register",
      dataIndex: "registry_number",
    },
    {
      title: "WS/DAS",
      render: (_, { watershed, river_region }) => (watershed || river_region ? `${watershed}/${river_region} ` : "-"),
    },
    {
      title: "Sungai Induk",
      dataIndex: "main_river",
    },
    {
      title: "Anak Sungai",
      dataIndex: "tributary",
    },
    {
      title: "Tipe",
      dataIndex: "type",
    },
    {
      title: "Jenis",
      dataIndex: "observation",
    },
    {
      title: "Aksi",
      fixed: "right",
      dataIndex: "id",
      render: (id, record) => (
        <Space>
          <Link href={`/admin/river-observation/${id}`}>
            <Button size="small">Detail</Button>
          </Link>
          <Link href={`/admin/river-observation/${id}/edit`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button disabled size="small" danger icon={<DeleteOutlined />} />
          <Button onClick={() => handleShowDownload(record)} icon={<FileExcelOutlined />} size="small" type="primary">
            Download Data
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

  return (
    <>
      <AntdTable scroll={{ x: "max-content" }} columns={coloumn} onChange={handleTableChange} {...props} />
      <Drawer
        open={drawer?.visible}
        title={drawer?.data?.name || "Download Data"}
        onClose={() => setDrawer({ visible: false, data: undefined })}
      >
        <Form
          initialValues={{ year: dayjsTz().year().toString(), type: "xlsx" }}
          submitText="Download"
          resetButtonProps={{ style: { display: "none" } }}
          schema={[
            {
              name: "year",
              label: "Tahun",
              type: "select",
              inputProps: {
                options: [
                  { label: "2021", value: "2021" },
                  { label: "2022", value: "2022" },
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                  { label: "2025", value: "2025" },
                ],
              },
            },
            {
              name: "type",
              label: "Format Download",
              type: "select",
              inputProps: {
                options: [
                  { label: "Excel", value: "xlsx" },
                  { label: "PDF", value: "pdf", disabled: true },
                ],
              },
            },
          ]}
          onSubmit={handleDownload}
        />
      </Drawer>
    </>
  );
};

export default Table;
