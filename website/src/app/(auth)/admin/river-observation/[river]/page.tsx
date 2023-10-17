import Chart from "../_components/charts";
import Detail from "../_components/detail";

type ParamsType = { river: string };

const RiverDetail = ({ params }: { params: ParamsType }) => {
  return (
    <>
      <Detail river={params.river} />
      <Chart river={params.river} />
    </>
  );
};

export default RiverDetail;
