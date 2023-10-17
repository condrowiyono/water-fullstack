"use client";

import { Button, Card, Col, Form, FormProps, Input, Row, Select, Space } from "antd";
import { River } from "@/interfaces";
import { RiverType } from "@/interfaces/enum";
import database from "@/data/data.json";

type RiverFormProps<T> = FormProps<T> & {
  loading?: boolean;
};

const validateMessages = {
  required: "${label} wajib diisi",
};

const RiverForm = ({ loading, ...props }: RiverFormProps<River>) => {
  return (
    <Card title="Data Sungai">
      <Form scrollToFirstError validateMessages={validateMessages} layout="vertical" disabled={loading} {...props}>
        <Space direction="vertical" className="w-full">
          <Card title="Data Pos" id="data-pos">
            <Form.Item label="Nama Pos" name="name" rules={[{ required: true }]}>
              <Input placeholder="Nama Pos" />
            </Form.Item>
            <Form.Item label="Tipe" name="type" rules={[{ required: true }]}>
              <Select placeholder="Tipe" options={Object.values(RiverType).map((value) => ({ label: value, value }))} />
            </Form.Item>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Pilih WS" name="river_region" rules={[{ required: true }]}>
                  <Select
                    placeholder="Pilih WS"
                    options={database.river_region.map((value) => ({ label: value, value }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DAS" name="watershed" rules={[{ required: true }]}>
                  <Select placeholder="DAS" options={database.watershed.map((value) => ({ label: value, value }))} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Sungai Induk" name="main_river" rules={[{ required: true }]}>
                  <Input placeholder="Sungai Induk" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Anak Sungai" name="tributary" rules={[{ required: true }]}>
                  <Input placeholder="Anak Sungai" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Nomor Registrasi" name="registry_number" rules={[{ required: true }]}>
              <Input placeholder="Nomor Registrasi" />
            </Form.Item>
          </Card>
          <Card title="Lokasi" id="location">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item label="Latitude" name="latitude">
                  <Input placeholder="Latitude" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Longitude" name="longitude">
                  <Input placeholder="Longitude" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item label="Lokasi (Desa/Kelurahan)" name="village">
                  <Input placeholder="Alamat" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Kecamatan" name="district">
                  <Input placeholder="Kecamatan" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Kabupaten/Kota" name="city">
                  <Input placeholder="Kabupaten/Kota" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Informasi Lainnya" id="other">
            <Form.Item label="Elevasi" name="elevation">
              <Input placeholder="Elevasi" />
            </Form.Item>
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item label="Tahun Pendirian" name="construction_year">
                  <Input placeholder="Tahun Pendirian" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Operator/Pengelola" name="operator">
                  <Input placeholder="Operator/Pengelola" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Pembuat" name="maker">
                  <Input placeholder="Didirikan Oleh" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Detail Pos Debit" id="debit-detail">
            <Row gutter={12}>
              <Col span={8}>
                <Form.Item label="Siaga Hijau " name="green_light">
                  <Input placeholder="Siaga Hijau" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Siaga Kuning" name="yellow_light">
                  <Input placeholder="Siaga Kuning" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Siaga Merah" name="red_light">
                  <Input placeholder="Siaga Merah" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Button loading={loading} type="primary" block htmlType="submit">
            Simpan
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default RiverForm;
