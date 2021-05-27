import React, { useState, useEffect } from 'react';

import styles from './counter.module.scss';

const Counter = ({ stepCount, scannedPositions }) => {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    let dist = 0;
    for (let i = 1; i < scannedPositions.length; i++) {
      const position = scannedPositions[i];
      const lastPosition = scannedPositions[i - 1];
      if (position > lastPosition) dist += position - lastPosition;
      else dist += lastPosition - position;
    }

    setDistance(dist);
  }, [scannedPositions]);

  return (
    <div className={styles.counter}>
      <div>
        total travel: <span className={styles.number}>{distance}</span>
      </div>
    </div>
  );
};

export default Counter;
