"use client";

import { Form, DatePicker, InputNumber, Select, Button, notification, Alert, Row, Col } from "antd";
import { today, formatString } from "@/utils/dayjs";
import { useRequest } from "ahooks";
import fetcher, { ErrorResponse } from "@/utils/fetcher";
import { useParams, useRouter } from "next/navigation";
import { ClimateData } from "@/interfaces";
import Upload from "@/components/Upload";
import { useSession } from "next-auth/react";

const InputForm = () => {
  const token = useSession().data?.accessToken;
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { run, loading } = useRequest(
    (data: Partial<ClimateData>) => {
      return fetcher({ url: "/mobile/climates", method: "POST", data, headers: { Authorization: `Bearer ${token}` } });
    },
    {
      manual: true,
      onSuccess: () => notification.success({ message: "Sukses Menyimpan Data" }),
      onError: (err) => {
        const error = err as ErrorResponse;
        notification.error({
          message: "Gagal Menyimpan Data",
          description: error.response?.data.errors,
        });
      },
      onFinally: router.refresh,
    }
  );

  const handleFinish = (data: Partial<ClimateData>) => {
    const { date, ...rest } = data;
    run({ ...rest, river_id: Number(id), date: formatString(date) });
  };

  return (
    <Form onFinish={handleFinish} initialValues={{ date: today() }} layout="vertical">
      <Form.Item label="Tanngal" name="date">
        <DatePicker disabled />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Suhu Minimum" name="min_temperature">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Suhu Maksimum" name="max_temperature">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Curah Hujan" name="rainfall">
        <InputNumber inputMode="numeric" placeholder="Curah Hujan (mm)" style={{ width: "100%" }} />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Kelembapan Bawah" name="wet_humidity">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Kelembapan Kering" name="dry_humidity">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Kelembapan" name="humidity">
        <InputNumber inputMode="numeric" placeholder="Kelembapan" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Kecepatan Angin" name="wind_speed">
        <InputNumber inputMode="numeric" placeholder="Kecepatan Angin" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Penguapan" name="evaporation">
        <InputNumber inputMode="numeric" placeholder="Penguapan" style={{ width: "100%" }} />
      </Form.Item>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Termometer Apung Min" name="min_float_level">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Termometer Apung Maks" name="max_float_level">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Pembacaan Hook Naik" name="upper_hook">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Pembacaan Hook Turun" name="lower_hook">
            <InputNumber inputMode="numeric" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Proses Penyinaran Matahari" name="illumination_process">
        <Select
          options={[
            { label: "Terbakar", value: "terbakar" },
            { label: "Tidak Terbakar", value: "tidak-terbakar" },
          ]}
        />
      </Form.Item>
      <Form.Item label="Durasi Penyinaran Matahari" name="illumination_duration">
        <InputNumber inputMode="numeric" placeholder="Durasi Penyinaran Matahari" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Unggah Gambar" name="image">
        <Upload filename={`tma-${id}`} />
      </Form.Item>
      <Button loading={loading} block type="primary" htmlType="submit">
        Simpan
      </Button>
    </Form>
  );
};

export default InputForm;
