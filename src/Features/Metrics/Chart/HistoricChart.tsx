import React from "react";
import useHistoricData from "../hooks/useHistoricData";
import LineChartComponent from "./LineChart";
import ChartHeader from "./ChartHeader";
import useActiveValueKeys from "../hooks/useActiveValueKeys";

const HistoricChart = () => {
  const [historicData, { min, max }] = useHistoricData();
  const valueKeys = useActiveValueKeys();

  return (
    <>
      <ChartHeader text="Historical Data" />
      <LineChartComponent data={historicData} min={min} max={max} valueKeys={valueKeys} />
    </>
  );
};

export default HistoricChart;
