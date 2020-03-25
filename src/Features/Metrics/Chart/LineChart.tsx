import React from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, Legend } from "recharts";

// import { ChartData } from "../../store/reducers/data/data.reducer";
import CustomizedAxisTick from "./CustomTick";
import { DenormalizedData } from "../utils/denormalizeData";
import CustomTooltip from "./CustomTooltip";

interface OwnProps {
  data: DenormalizedData[];
  min: number;
  max: number;
  valueKeys: {
    stroke: string;
    dataKey: string;
  }[];
}

// I am not making multiple labelled Y Axis because it would require weighting how data shows up.
// Otherwise seeing a 100 at the top of one axis has no real value when another axis causes the domain to be 1000 at max
// Instead I will let one axis tell the story of the data.
// An improvement I could do would be to add the unit to the label.
const LineChartComponent = ({ data, min, max, valueKeys }: OwnProps) => {
  return (
    <ResponsiveContainer height="80%">
      <LineChart data={data} margin={{ left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" tick={CustomizedAxisTick} />
        <YAxis domain={[min, max]} />
        <Tooltip content={<CustomTooltip />} />
        {valueKeys.map(key => {
          return (
            <Line
              type="monotone"
              dot={false}
              dataKey={key.dataKey}
              stroke={key.stroke}
              key={key.dataKey}
              animationDuration={900}
            />
          );
        })}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
