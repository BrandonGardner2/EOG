import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, InputLabel, makeStyles, Container } from '@material-ui/core';

import { getLiveStatus } from '../selectors';
import { updateLiveStatus } from '../reducer';

const useStyles = makeStyles(theme => {
  return {
    switchBase: {
      '&$checked': {
        color: theme.palette.primary.main,
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    checked: {},
    track: {},
    container: {
      padding: 0,
      display: 'flex',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
    },
  };
});

// Since I am only defining two options for now, I can use a switch.
// If I needed more options I would just use a select field instead.
const TimeSelector = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLive = useSelector(getLiveStatus);

  const swapLiveStatus = () => {
    dispatch(updateLiveStatus());
  };

  return (
    <Container className={classes.container}>
      <InputLabel className={classes.label}>Live Data</InputLabel>
      <Switch
        classes={{ switchBase: classes.switchBase, checked: classes.checked, track: classes.track }}
        name="Live Data"
        checked={isLive}
        onChange={swapLiveStatus}
      />
    </Container>
  );
};

export default TimeSelector;
