import React, { useMemo } from 'react';
import { Card, List, makeStyles } from '@material-ui/core';
import { MetricData } from '../reducer';
import LastUpdateCard from './LastUpdateCard';

const useStyles = makeStyles({
  card: {
    maxWidth: '25%',
    marginLeft: 'auto',
    height: '300px',
    padding: '0 16px',
    overflow: 'auto',
  },
});

const LastUpdateList = () => {
  const classes = useStyles();
  const latestUpdates: MetricData[] = [
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
    { metric: 'oilTemp', at: 1, unit: 'F', value: 100 },
  ];

  const lastUpdateCards = useMemo(() => {
    return latestUpdates
      .sort((a: MetricData, b: MetricData) => (a.metric > b.metric ? 1 : -1))
      .map((data: MetricData) => {
        return <LastUpdateCard data={data} />;
      });
  }, [latestUpdates]);

  return (
    <Card className={classes.card}>
      <List>{lastUpdateCards}</List>
    </Card>
  );
};

export default LastUpdateList;
