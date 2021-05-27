import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer
} from 'recharts';

import { useInterval } from '../../hooks';

import { Counter } from '..';

import styles from './visualizer.module.scss';

const Visualizer = ({
  pattern,
  algorithm,
  started,
  setStarted,
  setError,
  error
}) => {
  const [stepCount, setStepCount] = useState(0);
  const [scannedPositions, setScannedPositions] = useState([10]);
  const [unvisitedPositions, setUnvisitedPositions] = useState(
    pattern.slice(0)
  );

  useInterval(
    () => {
      step();
    },
    started ? 700 : null
  );

  useEffect(() => {
    reset();
    setStarted(false);
  }, [pattern, algorithm]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (started) {
      reset();
    }
  }, [started]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (started) {
      setStepCount(0);
      setError('');
    }
  }, [setError, started]);

  const reset = () => {
    setStepCount(0);
    setUnvisitedPositions(pattern.slice(0));
    setScannedPositions([10]);
  };

  const step = () => {
    const lastPosition = scannedPositions[scannedPositions.length - 1];

    let position;

    switch (algorithm) {
      case 'FCFS':
        position = unvisitedPositions.shift();
        break;
      case 'SSTF':
        unvisitedPositions.sort(
          (a, b) => Math.abs(a - lastPosition) - Math.abs(b - lastPosition)
        );
        position = unvisitedPositions.shift();
        break;
      case 'SCAN':
      case 'LOOK':
        const isScan = algorithm === 'SCAN';

        const isRightDirection =
          !!unvisitedPositions.find(p => p >= lastPosition) ||
          (isScan && !scannedPositions.includes(49));

        if (isRightDirection) {
          position =
            unvisitedPositions
              .filter(p => p >= lastPosition)
              .sort((a, b) => a - b)[0] ||
            (isScan && 49);
          if (unvisitedPositions.includes(position)) {
            unvisitedPositions.splice(unvisitedPositions.indexOf(position), 1);
          }
        } else {
          position = unvisitedPositions.sort((a, b) => a - b).pop();
        }
        break;
      default:
        break;
    }

    setScannedPositions(scannedPositions.concat([position]));

    setStepCount(stepCount + 1);

    if (unvisitedPositions.length === 0) {
      setStarted(false);
    }
  };

  return (
    <div className={styles.visualizer}>
      <ResponsiveContainer
        width="90%"
        height={(scannedPositions.length + 1) * 40}
      >
        <LineChart
          layout="vertical"
          data={scannedPositions.map((value, index) => ({
            index,
            value
          }))}
        >
          <XAxis
            domain={[0, 49]}
            tickCount={50}
            interval={0}
            orientation="top"
            type="number"
          >
            <Label
              offset={-5}
              position="insideTop"
              value="Head position"
              style={{
                fontSize: '85%',
                fill: 'rgba(255, 255, 255, 0.87)'
              }}
            />
          </XAxis>
          <YAxis
            domain={[0, scannedPositions.length]}
            ticks={[...scannedPositions.keys()]}
            interval={0}
            dataKey="index"
            type="number"
          />
          <Line dataKey="value" stroke="#8884d8" />
          <Tooltip
            labelFormatter={label =>
              label === 0 ? `Initial position` : `Step: ${label}`
            }
            formatter={value => [`Position: ${value}`, null]}
            isAnimationActive={false}
            active={!started && scannedPositions.length > 1}
          />
        </LineChart>
      </ResponsiveContainer>
      <Counter scannedPositions={scannedPositions} stepCount={stepCount} />
    </div>
  );
};

export default Visualizer;
