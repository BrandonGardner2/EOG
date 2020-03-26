import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubscription } from "urql";
import { MetricData, addDataToMetric } from "../reducer";
import { getDenormalizedActiveData } from "../selectors";

// In a production application I may prefer to put this into the network folder under subscriptions.
// It would likely be used elsewhere besides the Metrics feature.
const subscription = `
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

type NewData = {
  newMeasurement: MetricData;
};

// This hook is really basic, but it removes a lot of boiler plate from my metric components.
const useMetricSubscription = () => {
  const dispatch = useDispatch();
  const data = useSelector(getDenormalizedActiveData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNewData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_: any, { newMeasurement }: NewData) => {
      // I noticed in weather that dispatch is being passed .type and a payload
      // but the createSlice function gives us our reducer actions as a usable function.
      // this allows us to use typescript to our advantage.
      dispatch(addDataToMetric(newMeasurement));
    },
    [dispatch],
  );

  useSubscription({ query: subscription }, handleNewData);

  return data;
};

export default useMetricSubscription;
