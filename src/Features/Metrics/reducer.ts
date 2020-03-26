// I would use the newer redux-toolkit package rather than starter kit as it is now officially supported.
import { createSlice, PayloadAction } from "redux-starter-kit";

// Normally I would put types into their own area that are going to be widely used. For this challenge though,
// I think it is okay for them to be here so that the reviewer can quickly see what my state looks like.
export type MetricData = {
  value: number | string;
  at: number;
  metric: string;
  unit: string;
};

export type MetricState = {
  // Data will be constantly updating. I will store it separately so that names selectors
  // can be memoized for longer periods of time.
  dataByName: {
    [key: string]: MetricData[];
  };
  // Metric Info is not likely to change. We can use an isolated piece of state for consistancy.
  names: string[];
  activeNames: string[];
  limit: number | undefined;
  isLive: boolean;
};

const initialState: MetricState = {
  dataByName: {},
  names: [],
  activeNames: [],
  limit: undefined,
  isLive: false,
};

const metricSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    addMetricsNames(state, action: PayloadAction<string[]>) {
      // In a non typescript environment I would do some type checking to make sure I am receiving an array.
      state.names = action.payload;
    },
    // I could make multiple reducer functions to add/remove instead of one.
    // However, using a multi-select it may just be easier in this assignment to pass the array already changed.
    // May change later.
    updateActiveMetrics(state, action: PayloadAction<string[]>) {
      state.activeNames = action.payload;
    },
    // Update how much data to limit on the chart. Can be useful for preventing a huge amount of data over time.
    updateLimit(state, action: PayloadAction<number | undefined>) {
      state.limit = action.payload;
    },
    addDataToMetric(state, action: PayloadAction<MetricData>) {
      const { metric } = action.payload;
      if (!state.dataByName[metric]) state.dataByName[metric] = [];
      state.dataByName[metric].push(action.payload);
    },
    replaceDataForMetrics(state, action: PayloadAction<MetricState["dataByName"]>) {
      state.dataByName = action.payload;
    },
    updateLiveStatus(state) {
      state.isLive = !state.isLive;
      // Reset data, because we are going to swap from query/subscription
      state.dataByName = {};
      state.limit = undefined;
    },
  },
});

// I'm going to use destructuring here so that I can rely on intellisense in other areas for importing easier.
// It also helps make it obvious what is happening.
const { reducer: metricReducer, actions } = metricSlice;
export default metricReducer;

export const {
  addMetricsNames,
  updateActiveMetrics,
  updateLimit,
  addDataToMetric,
  updateLiveStatus,
  replaceDataForMetrics,
} = actions;
