"use client";

import React, { useState } from "react";
import { Upload as AntUpload, UploadProps, Button } from "antd";
import type { UploadChangeParam } from "antd/lib/upload";
import usePropsValue from "@/hooks/usePropsValue";
import fetcher from "@/utils/fetcher";

type CustomUploadProps = {
  filename?: string;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
} & Omit<UploadProps, "value" | "defaultValue" | "onChange" | "type">;

type UploadResponse = {
  filename: string;
};

const Upload = (props: CustomUploadProps) => {
  const [progress, setProgress] = useState({ percent: 0 });
  const [value, setValue] = usePropsValue({
    defaultValue: props.defaultValue || "",
    value: props.value || "",
    onChange: (value: string) => props.onChange?.(value),
  });

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      setValue(info.file.response);
    }
  };

  return (
    <>
      <AntUpload
        showUploadList={false}
        onChange={handleChange}
        customRequest={async (options) => {
          const { file, onError, onProgress, onSuccess } = options;

          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("filename", props.filename || "");

            const data = await fetcher<UploadResponse>({
              url: "/upload",
              method: "POST",
              data: formData,
              onUploadProgress: ({ total, loaded }) => {
                if (total && loaded) {
                  const percent = Math.round((loaded / total) * 100);
                  onProgress?.({ percent });
                  setProgress?.({ percent });
                }
              },
            });

            const url = data.data.filename;
            onSuccess?.(url);
          } catch (err) {
            onError?.(err as Error);
          } finally {
            setProgress?.({ percent: 0 });
          }
        }}
      >
        <Button disabled={props.disabled} loading={progress.percent !== 0}>
          {progress.percent ? progress.percent.toFixed(2) : "Upload"}
        </Button>
      </AntUpload>
      <div className="text-gray-500">{value || ""}</div>
    </>
  );
};

export default Upload;
