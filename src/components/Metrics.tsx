import React, { useEffect, useCallback } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "urql";
import MetricContainer from "../Features/Metrics/MetricContainer";
import LastUpdateList from "../Features/Metrics/LastUpdate/LastUpdateList";
import TimeSelector from "../Features/Metrics/Header/TimeSelector";
import MetricInput from "../Features/Metrics/MetricInput/MetricInput";
import LimitInput from "../Features/Metrics/LimitInput/LimitInput";
import HistoricLabel from "../Features/Metrics/HistoricLabel/HistoricLabel";
import { getLiveStatus } from "../Features/Metrics/selectors";
import { addMetricsNames } from "../Features/Metrics/reducer";
import HistoricChart from "../Features/Metrics/Chart/HistoricChart";

const useStyles = makeStyles({
  leftColumn: {
    padding: "8px 0 8px 16px",
  },
  chartContainer: {
    height: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

const query = `
  query {
    getMetrics
  }
`;

const Metrics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLive = useSelector(getLiveStatus);
  // I could put this query into a hook. I think it is okay here for now though.
  const [result] = useQuery({ query });

  const handleResult = useCallback(
    (names: string[]) => {
      dispatch(addMetricsNames(names));
    },
    [dispatch],
  );

  useEffect(() => {
    if (result?.data?.getMetrics) {
      handleResult(result.data.getMetrics);
    }
  }, [result, handleResult]);

  return (
    <MetricContainer>
      <Grid item lg={9} className={classes.leftColumn}>
        <Grid container spacing={0}>
          {/* I don't have to use extra grids to accomplish this. but I want 
          to make sure that the top section is always considered a full row */}
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <TimeSelector />
              {isLive ? <LimitInput /> : <HistoricLabel />}
              <MetricInput />
            </Grid>
          </Grid>
          {/* The Chart section will also get its own row. */}
          <Grid item xs={12} className={classes.chartContainer}>
            <HistoricChart />
          </Grid>
        </Grid>
      </Grid>
      <LastUpdateList />
    </MetricContainer>
  );
};

export default Metrics;
