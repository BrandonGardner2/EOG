import React from 'react';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { MetricData } from '../reducer';

const useStyles = makeStyles({
  listItem: {
    border: '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius: '5px',
    margin: '3px 0',
  },
});

type OwnProps = {
  data: MetricData;
};

const LastUpdateCard = ({ data }: OwnProps) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem} key={data.metric}>
      <ListItemText
        primary={data.metric}
        secondary={`Latest value: ${data.value} ${data.unit}`}
        primaryTypographyProps={{ variant: 'h6' }}
      />
    </ListItem>
  );
};

export default LastUpdateCard;
