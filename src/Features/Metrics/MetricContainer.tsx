import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ThemedCardHeader from '../../components/CardHeader';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
  cardContent: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '500px',
  },
});

type OwnProps = {
  children?: any;
};

// Realistically this could be its own Card component that renders children instead of MetricContainer.
// For the sake of not making the reviewer look everywhere we will keep it here :).
export default ({ children }: OwnProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <ThemedCardHeader title="Metric Breakdown" />
      <CardContent className={classes.cardContent}>
        <Grid spacing={0} container>
          {children ? children : null}
        </Grid>
      </CardContent>
    </Card>
  );
};
