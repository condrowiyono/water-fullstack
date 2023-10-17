"use client";

import { Form, notification } from "antd";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { River } from "@/interfaces";
import RiverForm from "../../_components/form";
import fetcher from "@/utils/fetcher";
import { useRequest } from "ahooks";

const Edit = ({}) => {
  const router = useRouter();
  const params = useParams<{ river: string }>();
  const pathname = usePathname();
  const token = useSession().data?.accessToken;
  const [form] = Form.useForm<River>();

  const { loading } = useRequest(
    () => fetcher<River>({ url: `/admin/rivers/${params.river}`, headers: { Authorization: `Bearer ${token}` } }),
    {
      onSuccess: (data) => {
        form.setFieldsValue(data.data);
      },
      refreshDeps: [token],
    }
  );

  const { run, loading: editLoading } = useRequest(
    (data) =>
      fetcher<River>({
        url: `/admin/rivers/${params.river}`,
        method: "PUT",
        data,
        headers: { Authorization: `Bearer ${token}` },
      }),
    {
      manual: true,
      onSuccess: () => {
        notification.success({ message: "Sukses Menyimpan Data" });
        router.push("/admin/river-observation");
      },
      refreshDeps: [token],
    }
  );

  return <RiverForm onFinish={run} form={form} loading={loading || editLoading} />;
};

export default Edit;
