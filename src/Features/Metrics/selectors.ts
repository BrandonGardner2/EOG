import { MetricState, MetricData } from './reducer';
import { IState } from '../../store/index';
import { createSelector } from 'redux-starter-kit';
import sliceDataFromEnd from './utils/sliceData';
import denormalizeMetricData from './utils/denormalizeData';

const metricStateSelector = (state: IState) => state.metrics;

// Create selector is an idea from Reselect.
// It can be used to help with selector management and memoization due to watching input changes
const getMetricNames = createSelector(
  metricStateSelector,
  metrics => metrics.names,
);

const getMetricData = createSelector(
  metricStateSelector,
  metrics => metrics.dataByName,
);

const getMetricDataLimit = createSelector(
  metricStateSelector,
  metrics => metrics.limit,
);

const getActiveMetrics = createSelector(
  metricStateSelector,
  metrics => metrics.activeNames,
);

// Returns a callback that takes in a name to return a specific set of data.
const getMetricDataByName = createSelector(
  [getMetricData],
  metricData => (name: string) => {
    return metricData[name] || [];
  },
);

// One of the first examples where createSelector comes in handy.
// We take in the getActiveMetrics that is already using metricStateSelector
// No need to define it again or access nested state objects.
const getActiveMetricsData = createSelector(
  [getActiveMetrics, getMetricDataByName],
  (activeMetrics, getDataForName) => {
    // I could return a single array containing everything here.
    // But I will let another selector do that work instead..
    // because we should denormalize the data for Recharts as it only expects one input array.
    const dataByMetric = activeMetrics.reduce(
      (acc, name: string) => {
        // I am opting to mutate the accumulator here rather than creating new objects every time
        // We are dealing with subscriptions and computation speed matters.
        acc[name] = getDataForName(name);
        return acc;
      },
      {} as MetricState['dataByName'],
    );

    return dataByMetric;
  },
);

const getDenormalizedActiveData = createSelector(
  [getActiveMetricsData, getMetricDataLimit],
  (dataByName, limit) => {
    return denormalizeMetricData(dataByName, limit);
  },
);

export default {
  getMetricNames,
  getMetricData,
  getMetricDataByName,
  getMetricDataLimit,
  getActiveMetricsData,
  getDenormalizedActiveData,
};
