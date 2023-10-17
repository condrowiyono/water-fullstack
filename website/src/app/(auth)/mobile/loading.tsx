import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="text-center">
      <Spin spinning />
    </div>
  );
};

export default Loading;
