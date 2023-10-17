"use client";

import { useRequest } from "ahooks";
import UserForm from "../_components/form";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { User } from "@/interfaces";
import { notification } from "antd";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Create = () => {
  const token = useSession().data?.accessToken;
  const router = useRouter();

  const { loading: mutationLoading, run } = useRequest(
    (data) =>
      fetcher<User>({ url: "/admin/users", method: "POST", data, headers: { Authorization: `Bearer ${token}` } }),
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

  return <UserForm onFinish={run} loading={mutationLoading} />;
};

export default Create;
