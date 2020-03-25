import { createSelector } from "redux-starter-kit";
import { MetricState } from "./reducer";
import { IState } from "../../store/index";
import denormalizeMetricData from "./utils/denormalizeData";

const metricStateSelector = (state: IState) => state.metrics;

// Create selector is an idea from Reselect.
// It can be used to help with selector management and memoization due to watching input changes
const getMetricNames = createSelector(metricStateSelector, metrics => metrics.names);

const getMetricData = createSelector(metricStateSelector, metrics => metrics.dataByName);

const getMetricDataLimit = createSelector(metricStateSelector, metrics => metrics.limit);

const getActiveMetrics = createSelector(metricStateSelector, metrics => metrics.activeNames);

const getLiveStatus = createSelector(metricStateSelector, metrics => metrics.isLive);

// Returns a callback that takes in a name to return a specific set of data.
const getMetricDataByName = createSelector([getMetricData], metricData => (name: string) => {
  return metricData[name] || [];
});

// One of the first examples where createSelector comes in handy.
// We take in the getActiveMetrics that is already using metricStateSelector
// No need to define it again or access nested state objects.
const getActiveMetricsData = createSelector(
  [getActiveMetrics, getMetricDataByName],
  (activeMetrics, getDataForName) => {
    // I could return a single array containing everything here.
    // But I will let another selector do that work instead..
    // because we should denormalize the data for Recharts as it only expects one input array.
    const dataByMetric = activeMetrics.reduce((acc, name: string) => {
      // I am opting to mutate the accumulator here rather than creating new objects every time
      // We are dealing with subscriptions and computation speed matters.
      acc[name] = getDataForName(name);
      return acc;
    }, {} as MetricState["dataByName"]);

    return dataByMetric;
  },
);

const getLatestUpdates = createSelector([getActiveMetrics, getMetricDataByName], (activeMetrics, getDataForName) => {
  return activeMetrics.map((metric: string) => {
    const data = getDataForName(metric);
    if (data.length) return data[data.length - 1];
    return {
      metric,
      at: 0,
      value: "None",
      unit: "",
    };
  });
});

const getDenormalizedActiveData = createSelector([getActiveMetricsData, getMetricDataLimit], (dataByName, limit) => {
  // I could just use a really long array for absolutely everything.
  // In the interest of saving on some memory I think it may be more beneficial
  // to denormalize using the timestamp.
  // Ex: if we have 100 unique timestamps and 5 active metrics that all have data for those timestamps
  // We need to use an array that is 500 in length.
  // If we denormalize we only need an array that is 100 in length.
  return denormalizeMetricData(dataByName, limit);
});

export {
  getLatestUpdates,
  getLiveStatus,
  getActiveMetrics,
  getMetricNames,
  getMetricData,
  getMetricDataByName,
  getMetricDataLimit,
  getActiveMetricsData,
  getDenormalizedActiveData,
};
