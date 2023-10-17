import { useForm as useFormAntd } from "antd/es/form/Form";
import { FormItemProps } from "antd/es/form";

import { FormSchema } from ".";

type Rules = FormItemProps["rules"];

const buildRules = <T extends Record<string, any>>(schema: FormSchema<T>): Rules => {
  const { required } = schema;
  const rules: Rules = [];

  if (required) rules.push({ required: true });
  return [...rules, ...(schema.rules ?? [])];
};

const useForm = useFormAntd;

export { buildRules, useForm };
