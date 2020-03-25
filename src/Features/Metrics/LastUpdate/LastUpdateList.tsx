import React, { useMemo } from "react";
import { List, makeStyles, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import LastUpdateCard from "./LastUpdateCard";
import { MetricData } from "../reducer";
import { getLatestUpdates } from "../selectors";

const useStyles = makeStyles({
  container: {
    height: "400px",
    padding: "0 16px",
    overflow: "auto",
  },
});

const LastUpdateList = () => {
  const classes = useStyles();
  const latestUpdates = useSelector(getLatestUpdates);

  const lastUpdateCards = useMemo(() => {
    return latestUpdates
      .sort((a: MetricData, b: MetricData) => (a.metric > b.metric ? 1 : -1))
      .map((data: MetricData) => {
        return <LastUpdateCard data={data} key={data.metric} />;
      });
  }, [latestUpdates]);

  return (
    <Grid item lg={3} className={classes.container}>
      <List>{lastUpdateCards}</List>
    </Grid>
  );
};

export default LastUpdateList;
