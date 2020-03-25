import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "urql";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { getActiveMetrics } from "../selectors";

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

const useHistoricData = () => {
  const dispatch = useDispatch();
  const activeMetrics = useSelector(getActiveMetrics);
  const [refetch, setRefetch] = useState(false);
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
  }, [activeMetrics, refetch]);

  const [result] = useQuery({
    query,
    variables: { input: queryVariables },
    pause: !activeMetrics.length,
    requestPolicy: "network-only",
  });

  const handleResult = useCallback((res: any) => {
    console.log(res);
  }, []);

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
        setRefetch(!refetch);
      }, 60000);
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return "";
};

export default useHistoricData;
