import React from 'react';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { MetricData } from '../reducer';
// I made a definitions file just to have prettier display names.
// Typically I would expect some kind of display name from the API.
// but this can be used in absence assuming all possible values are known ahead of time.
import definitions from '../utils/definitions';

const useStyles = makeStyles({
  listItem: {
    boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.12)',
    borderRadius: '5px',
    margin: '4px 0',
  },
});

type OwnProps = {
  data: MetricData;
};

const LastUpdateCard = ({ data }: OwnProps) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={definitions.metrics[data.metric] || 'Unknown Metric'}
        secondary={`Latest value: ${data.value} ${data.unit}`}
        primaryTypographyProps={{ variant: 'h6' }}
      />
    </ListItem>
  );
};

export default LastUpdateCard;
