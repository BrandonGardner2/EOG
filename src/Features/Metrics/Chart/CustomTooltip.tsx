import React from "react";
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

  if (active && payload) {
    return (
      <div className={classes.tooltip}>
        <p>{label}</p>
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
