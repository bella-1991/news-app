import React from 'react';
import styles from './skeleton.module.scss';

const Skeleton = ({ width, height, variant }) => {
  const style = {
    width: width,
    height,
  };
  return <span className={`${styles.skeleton || ''} ${variant ? styles[variant] || '' : ''}`} style={style}></span>;
};

export default Skeleton;
