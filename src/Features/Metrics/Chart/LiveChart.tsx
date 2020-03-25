import React from "react";
import LineChartComponent from "./LineChart";
import ChartHeader from "./ChartHeader";
import useMetricSubscription from "../hooks/useMetricSubscription";
import useActiveValueKeys from "../hooks/useActiveValueKeys";

const LiveChart = () => {
  const [historicData, { min, max }] = useMetricSubscription();
  const valueKeys = useActiveValueKeys();

  return (
    <>
      <ChartHeader text="Historical Data" />
      <LineChartComponent data={historicData} min={min} max={max} valueKeys={valueKeys} />
    </>
  );
};

export default LiveChart;
