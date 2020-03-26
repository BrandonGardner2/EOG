import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { TooltipProps } from "recharts";

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: "white",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    padding: "10px",
    borderRadius: 5,
  },
});

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  const classes = useStyles();

  // Ignoring this rule isn't great. I would normally disable it.
  // It can lead to some really ugly syntax
  if (active && payload) {
    return (
      <div className={classes.tooltip}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <p>{moment(label as number).format("HH:mm:ss")}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
