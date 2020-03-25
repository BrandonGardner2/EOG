import { IState } from './../../store/index';
import { createSelector } from 'redux-starter-kit';

const metricStateSelector = (state: IState) => state.metrics;

// Create selector is an idea from Reselect.
// It can be used to help with selector management and memoization due to watching input changes
const getMetricNamesSelector = createSelector(
  metricStateSelector,
  metrics => metrics.names,
);

export default { getMetricNamesSelector };
