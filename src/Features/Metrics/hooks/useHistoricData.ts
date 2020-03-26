import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "urql";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { MetricState, replaceDataForMetrics, MetricData } from "../reducer";
import { getActiveMetrics, getDenormalizedActiveData } from "../selectors";

const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
`;

export type MultipleMetricResponse = {
  metric: string;
  measurements: MetricData[];
};

const useHistoricData = () => {
  const dispatch = useDispatch();
  const historicData = useSelector(getDenormalizedActiveData);
  const activeMetrics = useSelector(getActiveMetrics);
  const [lastFetchTime, setLastFetchTime] = useState<Date>();
  const interval = useRef<NodeJS.Timeout | undefined>();
  const queryVariables = useMemo(() => {
    return activeMetrics.map(metric => {
      return {
        metricName: metric,
        before: Date.now(),
        // 30 minutes
        after: Date.now() - 1000 * 60 * 30,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMetrics, lastFetchTime]);

  const [result] = useQuery({
    query,
    variables: { input: queryVariables },
    pause: !activeMetrics.length,
    requestPolicy: "network-only",
  });

  const handleResult = useCallback(
    (data: MultipleMetricResponse[]) => {
      const updateObject = data.reduce((acc, cur) => {
        acc[cur.metric] = cur.measurements;
        return acc;
      }, {} as MetricState["dataByName"]);

      dispatch(replaceDataForMetrics(updateObject));
    },
    [dispatch],
  );

  useEffect(() => {
    if (result?.data?.getMultipleMeasurements) {
      handleResult(result?.data?.getMultipleMeasurements);
    }
  }, [result, handleResult]);

  // Set an interval to poll for historic data.
  // Cleanup on unmount.
  useEffect(() => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setLastFetchTime(new Date());
      }, 60000);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return historicData;
};

export default useHistoricData;
