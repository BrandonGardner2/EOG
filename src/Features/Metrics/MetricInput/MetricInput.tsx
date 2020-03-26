import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, InputLabel, Grid, makeStyles, MenuItem } from "@material-ui/core";
import useMetricOptions from "../hooks/useMetricOptions";
import { getActiveMetrics } from "../selectors";
import { updateActiveMetrics } from "../reducer";
import definitions from "../utils/definitions";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
  },
  select: {
    minWidth: "120px",
    marginLeft: "5px",
  },
});

const MetricInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeMetrics = useSelector(getActiveMetrics);
  const { availableOptions } = useMetricOptions();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (typeof event.target.value === "string") {
      const newActive = [...activeMetrics, event.target.value];
      dispatch(updateActiveMetrics(newActive));
    }
  };

  const optionItems = useMemo(() => {
    return availableOptions.map(option => {
      return (
        <MenuItem key={option} value={option}>
          {definitions.names[option] || "Unknown Metric"}
        </MenuItem>
      );
    });
  }, [availableOptions]);

  return (
    <Grid className={classes.container} item xs={4}>
      <InputLabel id="metric-input">Add Metrics</InputLabel>
      <Select
        className={classes.select}
        labelId="metric-input"
        onChange={handleChange}
        value=""
        disabled={!optionItems.length}
      >
        {optionItems}
      </Select>
    </Grid>
  );
};

export default MetricInput;
