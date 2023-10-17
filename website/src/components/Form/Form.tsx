import { ReactNode, RefAttributes } from "react";
import { Form as BaseForm, Input, InputNumber, Select, Col, Row, Button, Checkbox, Radio, DatePicker } from "antd";
import type {
  FormProps as BaseFormProps,
  FormInstance,
  FormItemProps,
  InputProps,
  ButtonProps,
  InputNumberProps,
  SelectProps,
  ColProps,
  RadioGroupProps,
  DatePickerProps,
  InputRef,
} from "antd";
import { NamePath } from "antd/es/form/interface";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { SearchProps, TextAreaProps } from "antd/es/input";

import { buildRules } from "./utils";

type BaseFormSchema<T = any> = {
  label: string;
  name: keyof T;
  key?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  rules?: FormItemProps["rules"];
  forceAutoFocus?: boolean;
  itemProps?: FormItemProps;
};

type InputFormSchema =
  | { type: "text" | "password"; inputProps?: InputProps & RefAttributes<InputRef> }
  | { type: "number"; inputProps?: InputNumberProps & RefAttributes<HTMLInputElement> }
  | { type: "search"; inputProps?: SearchProps & RefAttributes<InputRef> }
  | { type: "select"; inputProps?: SelectProps }
  | { type: "textarea"; inputProps?: TextAreaProps }
  | { type: "date"; inputProps?: DatePickerProps }
  | { type: "radio-group"; inputProps?: RadioGroupProps }
  | { type: "json-readonly" }
  | { type: "checkbox-group"; inputProps?: CheckboxGroupProps }
  | { type: "custom"; component: ReactNode };

type FormSchema<T extends Record<string, any>> = BaseFormSchema<T> & InputFormSchema;

type FormType<T extends Record<string, any>> = {
  schema: FormSchema<T>[];
  form?: FormInstance<T>;
  gridCols?: ColProps;
  initialValues?: Partial<T>;
  loading?: boolean;
  submitText?: string;
  resetText?: string;
  resetButtonProps?: ButtonProps;
  submitButtonProps?: ButtonProps;
  onSubmit?: (values: T) => void;
} & Omit<BaseFormProps, "form" | "initialValues" | "onFinish">;

const renderFormItemInput = <T extends Record<string, any>>(item: FormSchema<T>) => {
  const { type, label, placeholder: _placeholder } = item;
  const placeholder = _placeholder ?? `Masukkan ${label}`;

  switch (type) {
    case "text":
      return <Input placeholder={placeholder} {...item.inputProps} />;
    case "password":
      return <Input.Password placeholder={placeholder} {...item.inputProps} />;
    case "number":
      return <InputNumber placeholder={placeholder} {...item.inputProps} />;
    case "search":
      return <Input.Search placeholder={placeholder} {...item.inputProps} />;
    case "json-readonly":
      return <Input.TextArea style={{ minHeight: 200 }} disabled placeholder={placeholder} />;
    case "select":
      return <Select placeholder={placeholder} {...item.inputProps} />;
    case "textarea":
      return <Input.TextArea placeholder={placeholder} {...item.inputProps} />;
    case "date":
      return <DatePicker {...item.inputProps} />;
    case "radio-group":
      return <Radio.Group {...item.inputProps} />;
    case "checkbox-group":
      return <Checkbox.Group {...item.inputProps} />;
    case "custom":
      return item.component;

    default:
      return null;
  }
};

const renderFormItem = <T extends Record<string, any>>(item: FormSchema<T>) => {
  const { label, name, required, key, itemProps } = item;

  const itemName: NamePath = typeof name === "symbol" ? name.toString() : name;
  const rules = buildRules(item);

  return (
    <BaseForm.Item
      key={key ?? itemName.toString()}
      name={itemName}
      required={required}
      rules={rules}
      label={label}
      {...itemProps}
    >
      {renderFormItemInput(item)}
    </BaseForm.Item>
  );
};

const renderFormItemInGrid = <T extends Record<string, any>>(schema: FormSchema<T>[], gridCols: ColProps) => {
  return (
    <Row gutter={16}>
      {schema.map((item) => (
        <Col key={item.name.toString()} {...gridCols}>
          {renderFormItem(item)}
        </Col>
      ))}
    </Row>
  );
};

const renderFormItemInChildren = <T extends Record<string, any>>(schema: FormSchema<T>[]) => {
  return schema.map(renderFormItem);
};

const Form = <T extends Record<string, any>>({
  form,
  schema,
  layout,
  gridCols,
  loading,
  submitText,
  resetText,
  resetButtonProps,
  submitButtonProps,
  onSubmit,
  ...rest
}: FormType<T>) => {
  const formLayout = gridCols ? "vertical" : layout;
  const handleReset = () => form?.resetFields();

  return (
    <BaseForm layout={formLayout} form={form} onReset={handleReset} onFinish={onSubmit} {...rest}>
      {gridCols ? renderFormItemInGrid(schema, gridCols) : renderFormItemInChildren(schema)}

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", flexWrap: "wrap" }}>
        <Button loading={loading} htmlType="reset" {...resetButtonProps}>
          {resetText ?? "Hapus Filter"}
        </Button>
        <Button type="primary" loading={loading} htmlType="submit" {...submitButtonProps}>
          {submitText ?? "Kirim"}
        </Button>
      </div>
    </BaseForm>
  );
};

export type { FormInstance, FormSchema, FormType };
export default Form;
