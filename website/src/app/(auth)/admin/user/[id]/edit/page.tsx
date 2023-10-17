"use client";

import { useRequest } from "ahooks";
import UserForm from "../../_components/form";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { User } from "@/interfaces";
import { Form, notification } from "antd";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

const Edit = () => {
  const router = useRouter();
  const token = useSession().data?.accessToken;
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm<User>();

  const { loading } = useRequest(
    () => fetcher<User>({ url: `/admin/users/${id}`, headers: { Authorization: `Bearer ${token}` } }),
    { refreshDeps: [token, id], onSuccess: (data) => form.setFieldsValue(data.data) }
  );

  const { loading: mutationLoading, run } = useRequest(
    (data) =>
      fetcher<User>({ url: `/admin/users/${id}`, method: "PUT", data, headers: { Authorization: `Bearer ${token}` } }),
    {
      manual: true,
      onSuccess: () => {
        notification.success({ message: "Sukses Menyimpan Data" });
        router.push("/admin/user");
      },
      onError: (err) => {
        const error = err as ErrorResponse;
        notification.error({
          message: "Gagal Menyimpan Data",
          description: error.response?.data.errors,
        });
      },
    }
  );

  return <UserForm form={form} mode="edit" onFinish={run} loading={mutationLoading || loading} />;
};

export default Edit;
