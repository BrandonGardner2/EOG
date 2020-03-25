// I would use the newer redux-toolkit package rather than starter kit as it is now officially supported.
import { createSlice, PayloadAction } from 'redux-starter-kit';

// Normally I would put types into their own area that are going to be widely used. For this challenge though,
// I think it is okay for them to be here so that the reviewer can quickly see what my state looks like.
export type MetricData = {
  value: string;
  timestamp: string;
  metricName: string;
};

export type MetricState = {
  // Data will be constantly updating. I will store it separately so that names selectors
  // can be memoized for longer periods of time.
  dataByName: {
    [key: string]: MetricData;
  };
  // Metric Info is not likely to change. We can use an isolated piece of state for consistancy.
  names: string[];
};

const initialState: MetricState = {
  dataByName: {},
  names: [],
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    addMetricsNames(state, action: PayloadAction<string[]>) {
      // In a non typescript environment I would do some type checking to make sure I am receiving an array.
      state.names = action.payload;
    },
  },
});

const { reducer, actions } = slice;
export { reducer, actions };
