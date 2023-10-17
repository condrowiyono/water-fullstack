"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import Form, { FormSchema } from "@/components/Form";
import { User } from "@/interfaces";

const schema: FormSchema<User>[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
  },
];

const Filter = ({ initialValues }: { initialValues?: Partial<User> }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = qs.parse(useSearchParams().toString());

  const handleFinish = (values: Partial<Omit<User, "river">>) => {
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
