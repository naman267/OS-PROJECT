import React from 'react';
import classnames from 'classnames';
import { colors } from '../../constants';

import styles from './block.module.scss';

const Block = ({ isInvisible, value, isIndexBlock, isErrorBlock }) => (
  <div
    className={classnames(styles.block)}
    style={{
      background: isInvisible || isIndexBlock ? 'transparent' : colors[value],
      color: isErrorBlock ? 'red' : 'white'
    }}
  >
    { isIndexBlock ? `${value}` : isErrorBlock ? 'x' : null}
    </div>
);

export default Block;
