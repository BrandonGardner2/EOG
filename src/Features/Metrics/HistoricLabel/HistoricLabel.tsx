import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const HistoricLabel = () => {
  const classes = useStyles();
  return (
    <Grid item xs={4} className={classes.container}>
      <Typography variant="body1" className={classes.text}>
        Last 30 minutes of events
      </Typography>
    </Grid>
  );
};

export default HistoricLabel;
