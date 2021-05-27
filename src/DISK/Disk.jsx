import React, { useState, useEffect } from 'react';

import { Select, Button, Visualizer, Link } from './components';
import { timelineOptions, algoOptions } from './constants';
import { parsePatternString } from './utils';

import styles from './Disk.module.scss';

const App = () => {
  const [algorithm, setAlgorithm] = useState(algoOptions[0].value);
  const [patternString, setPatternString] = useState(timelineOptions[0]);
  const [started, setStarted] = useState(false);
  const [pattern, setPattern] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    if (patternString !== 'custom') {
      setPattern(parsePatternString(patternString, setError));
    }
  }, [patternString]);

  return (
    <div className={styles.scheduler}>
      <Link/>
      <header className={styles.header}>
        <h1 className={styles.title}>Disk rotation scheduler</h1>
        <div className={styles.controls}>
          <div className={styles.timeline}>
            <h3>Rotation pattern</h3>
            <Select
              options={timelineOptions}
              onChange={({ target: { value } }) => {
                setPatternString(value);
                setStarted(false);
              }}
            />
            {patternString === 'custom' && (
              <input
                className={styles.customTimeline}
                onBlur={e => {
                  setPattern(parsePatternString(e.target.value, setError));
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    setPattern(parsePatternString(e.target.value, setError));
                  }
                }}
              />
            )}
          </div>
          <div className={styles.algo}>
            <h3>Algorithm</h3>
            <Select
              options={algoOptions}
              onChange={({ target: { value } }) => {
                setAlgorithm(value);
                setStarted(false);
              }}
            />
          </div>
        </div>
        <Button
          disabled={error === 'Invalid timeline!'}
          label={started ? 'STOP' : 'START'}
          onClick={() => {
            if (started) {
              setStarted(false);
            } else {
              setStarted(true);
            }
          }}
        />
        {error && <span className={styles.error}>{error}</span>}
      </header>
      <Visualizer
        algorithm={algorithm}
        pattern={pattern}
        started={started}
        setStarted={setStarted}
        setError={setError}
        error={error}
      />
    </div>
  );
};

export default App;
