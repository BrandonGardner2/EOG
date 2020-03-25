import React from 'react';
import definitions from '../utils/definitions';
import { MenuItem } from '@material-ui/core';

type OwnProps = {
  metric: string;
};

const MetricItem = ({ metric }: OwnProps) => {
  return <MenuItem value={metric}>{definitions.names[metric] || 'Unknown Metric'}</MenuItem>;
};

export default MetricItem;
