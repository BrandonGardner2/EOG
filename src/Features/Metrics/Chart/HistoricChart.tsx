import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Typography, makeStyles } from "@material-ui/core";
import useHistoricData from "../hooks/useHistoricData";
import LineChartComponent from "./LineChart";
import { getActiveMetrics } from "../selectors";
import definitions from "../utils/definitions";

const useStyles = makeStyles({
  header: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const HistoricChart = () => {
  const classes = useStyles();
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
      <Typography variant="h5" className={classes.header}>
        Historical Data
      </Typography>
      <LineChartComponent data={historicData} min={min} max={max} valueKeys={valueKeys} />
    </>
  );
};

export default HistoricChart;
