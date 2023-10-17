"use client";

import { River, User } from "@/interfaces";
import { Button, Card, Form, FormProps, Input, Select } from "antd";
import { UserType } from "@/interfaces/enum";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRequest } from "ahooks";
import fetcher from "@/utils/fetcher";

type UserFormProps = FormProps<User> & {
  loading?: boolean;
  mode?: "create" | "edit";
};

const UserForm = ({ loading, mode = "create", ...props }: UserFormProps) => {
  const token = useSession().data?.accessToken;
  const [name, setName] = useState("");

  const { data, loading: riverLoading } = useRequest(
    () => fetcher<River[]>({ url: "/admin/rivers", params: { name }, headers: { Authorization: `Bearer ${token}` } }),
    { refreshDeps: [token, name] }
  );

  return (
    <Card title="Pengguna">
      <Form layout="vertical" disabled={loading} {...props}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input placeholder="Nama" />
        </Form.Item>
        {mode === "create" && (
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
        )}
        <Form.Item name="user_type" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Role" options={Object.values(UserType).map((role) => ({ label: role, value: role }))} />
        </Form.Item>
        <Form.Item name="river_id" label="Pos">
          <Select
            placeholder="Pos"
            loading={riverLoading}
            showSearch
            allowClear
            filterOption={false}
            onSearch={setName}
            options={data?.data?.map((river) => ({ label: river.name, value: river.id }))}
          />
        </Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Simpan
        </Button>
      </Form>
    </Card>
  );
};

export default UserForm;
