import React from 'react';
import {Link} from 'react-router-dom'
import styles from './link.module.scss';

const Linkk = () => (
  <div className={styles.link}>
  
    <Link to="/disk">Disk Scheduler</Link>
   </div>
);

export default Linkk;