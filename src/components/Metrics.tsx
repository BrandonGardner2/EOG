import React from 'react';
import MetricContainer from '../Features/Metrics/MetricContainer';
import LastUpdateList from '../Features/Metrics/LastUpdate/LastUpdateList';
import TimeSelector from '../Features/Metrics/Header/TimeSelector';
import { Grid } from '@material-ui/core';

const Metrics = () => {
  return (
    <MetricContainer>
      <Grid item lg={9}>
        <Grid container spacing={0}>
          <TimeSelector />
        </Grid>
      </Grid>
      <LastUpdateList />
    </MetricContainer>
  );
};

export default Metrics;
