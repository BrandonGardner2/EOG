import { MetricState, MetricData } from "../reducer";
import sliceDataFromEnd from "./sliceData";

type TimestampData = {
  [key: string]: {};
};

export type DenormalizedData = {
  [key: string]: number | string;
  at: string;
};

type ReturnTuple = [DenormalizedData[], { min: number; max: number }];

const buildDataForTimestamp = (data: MetricData) => {
  const { metric, unit, value } = data;
  return {
    [`${metric}Unit`]: unit,
    [`${metric}Value`]: value,
  };
};

const denormalizeMetricData = (dataByName: MetricState["dataByName"], limit: number | undefined) => {
  // In retrospect, maybe my data should have been by timestamp the entire time so that this process could be easier.
  const dataByTimestamp: TimestampData = {};
  // Doing this here solely to avoid another loop elsewhere to find min and max values.
  let min = 0;
  let max = 100;

  // This first loop accesses the array of data for each active metric.
  // It isn't very costly, but if I were to use extra time I may reformat my data store to allow for a single loop.
  Object.values(dataByName).forEach((dataArray: MetricData[]) => {
    // The dataArray will contain data points we can use the timestamp from to denormalize.
    // This isn't COMPLETELY safe. We are assuming that the API will never send us a data point for the same metric
    // at the same time. It should be impossible for that to happen but it would be smart to plan for it in a production
    // Second issue is that it would be much nicer for space complexity in the application if units were stored with metrics.
    // I will probably come back to change this but if I don't.
    // 1. I would try and send back the units each metric uses when calling getMetrics from GraphQL.
    // 2. If that isn't available I would want a JSON file to store as configuration so that it never has to rely on queries.
    // 3. If that doesn't work well. I would try and add units to state on the very first subscription return.
    dataArray.forEach((data: MetricData) => {
      if (!dataByTimestamp[data.at]) {
        dataByTimestamp[data.at] = {
          at: data.at,
        };
      }
      // Using mutation rather than spreading just to keep speed up a little.
      Object.assign(dataByTimestamp[data.at], buildDataForTimestamp(data));
      if (typeof data.value === "number") {
        if (data.value < min) min = data.value;
        if (data.value > max) max = data.value;
      }
    });
  });

  // Originally I thought about letting getMetricData slice by limits.
  // I think this is better though because it guarantees last x timestamps.
  // If it were to be by metric, one piece of data may be updated while another is not yet.
  const limitedData = sliceDataFromEnd(Object.values(dataByTimestamp), limit);
  // Format min/max to give some extra space.
  if (min < 0) min = Math.floor(min * 1.1);
  if (max > 100) max = Math.ceil(max * 1.1);
  const returnArray: ReturnTuple = [limitedData, { min, max }];
  return returnArray;
};

export default denormalizeMetricData;
