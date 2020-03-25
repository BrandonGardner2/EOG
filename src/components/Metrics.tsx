import React from 'react';
import MetricContainer from '../Features/Metrics/MetricContainer';
import LastUpdateList from '../Features/Metrics/LastUpdate/LastUpdateList';
import TimeSelector from '../Features/Metrics/Header/TimeSelector';
import { Grid, makeStyles } from '@material-ui/core';
import MetricInput from '../Features/Metrics/MetricInput/MetricInput';
import LimitInput from '../Features/Metrics/LimitInput/LimitInput';
import HistoricLabel from '../Features/Metrics/HistoricLabel/HistoricLabel';
import { useSelector } from 'react-redux';
import { getLiveStatus } from '../Features/Metrics/selectors';

const useStyles = makeStyles({
  leftColumn: {
    padding: '8px 0 8px 16px',
  },
});

const Metrics = () => {
  const classes = useStyles();
  const isLive = useSelector(getLiveStatus);

  return (
    <MetricContainer>
      <Grid item lg={9} className={classes.leftColumn}>
        <Grid container spacing={0}>
          <TimeSelector />
          <MetricInput />
          {isLive ? <LimitInput /> : <HistoricLabel />}
        </Grid>
      </Grid>
      <LastUpdateList />
    </MetricContainer>
  );
};

export default Metrics;
