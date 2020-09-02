import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
  timer: {
    fontWeight: 800,
    fontSize: '2.5rem',
    border: '3px solid #2196f3',
    '&$finished': {
      border: "3px solid #f5bf42",
    },
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  finished: {},
  control: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [duration, setDuration] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [finished, setFinished] = useState(false);

  const tick = () => {
    if (duration > 0) {
      setDuration(duration => duration - 1);
    } else {
      clearInterval(intervalId);
    }
  };

  const addAMinute = () => {
    if ((duration / 60) < 99) {
      setDuration(duration => duration + 60);
    }
  };

  const start = () => {
    const interval = setInterval(tick, 1000);
    setTimerOn(true);
    setFinished(false);
    setIntervalId(interval);
  };

  const pause = () => {
    clearInterval(intervalId);
    setTimerOn(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    setTimerOn(false);
    setFinished(false);
    setDuration(0);
  };

  useEffect(() => {
    if (duration === 0 && timerOn === true) {
      clearInterval(intervalId);
      setTimerOn(false);
      setFinished(true);
    }
  }, [duration, intervalId, timerOn]);

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return (
    <Box className={classes.container}>
      <Box className={[classes.timer, finished ? classes.finished : ''].join(' ')}>
        {('0' + minutes).slice(-2)} : {('0' + seconds).slice(-2)}
      </Box>
      <Box className={classes.control}>
        <Button onClick={() => addAMinute()} variant="contained">+1 Minute</Button>
        {timerOn
          ? <Button color="primary" onClick={() => pause()} variant="contained">Pause</Button>
          : <Button color="primary" onClick={() => start()} variant="contained">Start</Button>
        }
        <Button color="secondary" onClick={() => reset()} variant="contained">Reset</Button>
      </Box>
    </Box>
  );
}

export default App;
