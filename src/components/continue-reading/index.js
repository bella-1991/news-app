import React from 'react';
import { Link } from 'react-router-dom';
import { MdChevronRight } from '@react-icons/all-files/md/MdChevronRight';
import styles from './continue-reading.module.scss';

const ContinueReading = ({ url, customCss }) => {

  return (
    <Link to={url} className={`${styles.continueReading} ${customCss}`}>
      <span>
        Read More
      </span>
      <MdChevronRight size={24} />
    </Link>
  )
};

ContinueReading.propTypes = {
};

export default ContinueReading;