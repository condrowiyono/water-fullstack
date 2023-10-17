"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import Form, { FormSchema } from "@/components/Form";
import { River } from "@/interfaces";

const schema: FormSchema<River>[] = [
  {
    name: "name",
    label: "Nama",
    type: "text",
  },
];

const Filter = ({ initialValues }: { initialValues?: Partial<River> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());

  const handleFinish = (values: Partial<River>) => {
    const finalURL = qs.stringifyUrl({
      url: pathname,
      query: { ...searchParams, ...values },
    });

    router.push(finalURL);
  };

  return (
    <Form
      schema={schema}
      initialValues={initialValues}
      gridCols={{ xs: 24, sm: 12 }}
      onReset={() => router.push(pathname)}
      onSubmit={handleFinish}
    />
  );
};

export default Filter;
