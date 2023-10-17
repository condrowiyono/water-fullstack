"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    zoomType: "x",
  },
  title: {
    text: "Data Curah Hujan",
  },
  xAxis: {
    type: "datetime",
  },
  time: {
    timezoneOffset: -8 * 60, // WITA
  },
  yAxis: {
    title: {
      text: "Curah Hujan",
    },
    legend: {
      enabled: false,
    },
  },
};

const RainfallIntradayChart = ({ series }: { series: any[] }) => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...options,
          series,
        }}
      />
    </div>
  );
};

export default RainfallIntradayChart;
