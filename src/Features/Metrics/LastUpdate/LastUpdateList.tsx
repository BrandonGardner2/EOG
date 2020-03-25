import React, { useMemo } from 'react';
import { List, makeStyles, Grid } from '@material-ui/core';

import LastUpdateCard from './LastUpdateCard';
import { MetricData } from '../reducer';

const useStyles = makeStyles({
  container: {
    // height: '500px',
    padding: '0 16px',
    overflow: 'auto',
  },
});

const LastUpdateList = () => {
  const classes = useStyles();
  const latestUpdates: MetricData[] = [
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'injValveOpen', at: 1, unit: 'F', value: 100 },
    { metric: 'tubingPressure', at: 1, unit: 'F', value: 100 },
    { metric: 'casingPressure', at: 1, unit: 'F', value: 100 },
    { metric: 'waterTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'flareTemp', at: 1, unit: 'F', value: 100 },
  ];

  const lastUpdateCards = useMemo(() => {
    return latestUpdates
      .sort((a: MetricData, b: MetricData) => (a.metric > b.metric ? 1 : -1))
      .map((data: MetricData) => {
        return <LastUpdateCard data={data} key={data.metric} />;
      });
  }, [latestUpdates]);

  return (
    <Grid item lg={3} className={classes.container}>
      <List>{lastUpdateCards}</List>
    </Grid>
  );
};

export default LastUpdateList;
