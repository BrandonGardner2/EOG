import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ThemedCardHeader from '../../components/CardHeader';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
  cardContent: {
    minHeight: '300px',
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
      <CardContent className={classes.cardContent}>{children ? children : null}</CardContent>
    </Card>
  );
};
