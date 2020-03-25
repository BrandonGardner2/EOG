import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import useHistoricData from "../hooks/useHistoricData";
import LineChartComponent from "./LineChart";
import { getActiveMetrics } from "../selectors";
import definitions from "../utils/definitions";
import ChartHeader from "./ChartHeader";

const HistoricChart = () => {
  const [historicData, { min, max }] = useHistoricData();
  const activeMetrics = useSelector(getActiveMetrics);

  const valueKeys = useMemo(() => {
    return activeMetrics.map(metric => {
      return {
        stroke: definitions.colors[metric] || "#000000",
        dataKey: `${metric}Value`,
      };
    });
  }, [activeMetrics]);

  return (
    <>
      <ChartHeader text="Historical Data" />
      <LineChartComponent data={historicData} min={min} max={max} valueKeys={valueKeys} />
    </>
  );
};

export default HistoricChart;
