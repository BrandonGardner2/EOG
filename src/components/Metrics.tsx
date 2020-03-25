import React from 'react';
import MetricContainer from '../Features/Metrics/MetricContainer';
import LastUpdateList from '../Features/Metrics/LastUpdate/LastUpdateList';
import TimeSelector from '../Features/Metrics/Header/TimeSelector';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  leftColumn: {
    padding: '8px 0 8px 16px',
  },
});

const Metrics = () => {
  const classes = useStyles();
  return (
    <MetricContainer>
      <Grid item lg={9} className={classes.leftColumn}>
        <Grid container spacing={0}>
          <TimeSelector />
        </Grid>
      </Grid>
      <LastUpdateList />
    </MetricContainer>
  );
};

export default Metrics;
