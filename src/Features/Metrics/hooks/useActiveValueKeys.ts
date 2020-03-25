import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getActiveMetrics } from "../selectors";
import definitions from "../utils/definitions";

const useActiveValueKeys = () => {
  const activeMetrics = useSelector(getActiveMetrics);

  const valueKeys = useMemo(() => {
    return activeMetrics.map(metric => {
      return {
        stroke: definitions.colors[metric] || "#000000",
        dataKey: `${metric}Value`,
      };
    });
  }, [activeMetrics]);

  return valueKeys;
};

export default useActiveValueKeys;
