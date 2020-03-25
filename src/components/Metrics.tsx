import React from 'react';
import MetricContainer from '../Features/Metrics/MetricContainer';
import LastUpdateList from '../Features/Metrics/LastUpdate/LastUpdateList';
import TimeSelector from '../Features/Metrics/Header/TimeSelector';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '74%',
    margin: 0,
  },
});

const Metrics = () => {
  const classes = useStyles();

  return (
    <MetricContainer>
      <Container className={classes.container}>
        <TimeSelector />
      </Container>
      <LastUpdateList />
    </MetricContainer>
  );
};

export default Metrics;
