import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spin spinning />
    </div>
  );
};

export default Loading;
