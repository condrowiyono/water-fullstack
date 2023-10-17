import Link, { LinkProps } from "next/link";
import { Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";

const BackButton = (props: LinkProps) => {
  return (
    <div>
      <Link {...props}>
        <Space>
          <LeftOutlined />
          Kembali
        </Space>
      </Link>
    </div>
  );
};

export default BackButton;
