import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

type OwnProps = {
  text: string;
};

const useStyles = makeStyles({
  header: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});

const ChartHeader = ({ text }: OwnProps) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.header}>
      {text}
    </Typography>
  );
};

export default ChartHeader;
