import React, { ReactElement } from "react";
import moment from "moment";

export interface TickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

const CustomizedAxisTick = ({ x, y, payload }: TickProps): ReactElement => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {moment(Number(payload.value)).format("HH:mm:ss")}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
