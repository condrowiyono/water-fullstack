"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RiverForm from "../_components/form";
import { River } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import { useRequest } from "ahooks";
import { notification } from "antd";

const Create = () => {
  const router = useRouter();
  const token = useSession().data?.accessToken;

  const { run, loading } = useRequest(
    (data) =>
      fetcher<River>({
        url: `/admin/rivers`,
        method: "POST",
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

  return <RiverForm onFinish={run} loading={loading} />;
};

export default Create;
