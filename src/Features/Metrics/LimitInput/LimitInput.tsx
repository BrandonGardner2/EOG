import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Grid, makeStyles, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/HighlightOff';

import { getMetricDataLimit } from '../selectors';
import { updateLimit } from '../reducer';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '50px',
    marginLeft: '5px',
  },
  inputText: {
    textAlign: 'center',
  },
  icon: {
    color: 'red',
    minWidth: 'auto',

    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const LimitInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentLimit = useSelector(getMetricDataLimit);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    // Ignore 0s or undefined values.
    if (value) {
      const numberValue = Number(value);

      if (isNaN(numberValue)) return;
      if (numberValue < 0) handleReset();
      else {
        // Get rid of decimals.
        const flooredValue = Math.floor(numberValue);
        dispatch(updateLimit(flooredValue));
      }
    } else handleReset();
  };

  const handleReset = () => {
    dispatch(updateLimit());
  };

  return (
    <Grid className={classes.container} item xs={4}>
      <InputLabel id="limit-input">Limit Live Data To</InputLabel>
      <Input
        className={classes.input}
        classes={{ input: classes.inputText }}
        value={currentLimit || ''}
        type="number"
        onChange={handleChange}
      />
      <DeleteIcon className={classes.icon} onClick={handleReset} />
    </Grid>
  );
};

export default LimitInput;
